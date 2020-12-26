import styled from "styled-components";
import { variable } from "../../styled";

export const NavbarContainer = styled.nav`
        position: fixed;
        width: 100%;
        z-index: 999;
        padding: 0 ${variable.ruler * 8}px;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
        background: ${variable.colors.white.one};
        height: ${variable.ruler * 8}px;
        display: flex;
        align-items: center;
        justify-content: stretch;
`;

export const NavbarLogo = styled.a`
        display: flex;
        align-items: center;
        width: 120px;
        height: 32px;
        flex-shrink: 0;
`;

export const NavbarLeft = styled.div`
        height: auto;
        display: flex;

        & > * {
                margin-left: ${variable.ruler * 3}px;
        }
`;
