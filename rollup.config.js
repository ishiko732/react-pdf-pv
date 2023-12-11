import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import image from '@rollup/plugin-image';
import packageJson from './package.json' assert {type: "json"};


export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({tsconfig: "./tsconfig.json"}),
            postcss({
                config: {
                    path: "./postcss.config.js",
                },
                extensions: [".css"],
                minimize: true,
                inject: {
                    insertAt: "top",
                },
            }),
            babel({
                babelHelpers: "bundled",
                exclude: "node_modules/**",
            }),
            terser(),
            image()
        ],
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{file: "dist/index.d.ts", format: "esm"}],
        plugins: [dts()],
        external: ["react", "react-dom","react/jsx-runtime","tailwindcss"],
    },
]