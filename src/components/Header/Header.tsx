import React from "react";

import {  imgWrap, HamLink } from "./styles";

const Header = () => {
    return (
        <div>
            <div css={imgWrap}>
                <img src={""} alt="Mezink" />
            </div>
            <div>
                <HamLink target="_new" href="https://mez.ink">
                    Home
                </HamLink>
                <HamLink href="https://mez.ink/aatif">My Mez link</HamLink>
            </div>
        </div>
    );
};

export default Header;