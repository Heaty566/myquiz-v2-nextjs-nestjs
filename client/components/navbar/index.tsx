import * as React from "react";
import { NavbarContainer, NavbarLogo, NavbarLeft, NavbarBtnMobile } from "./style";
import { SearchBox } from "../form/searchBox";
import { Layout } from "../../style/grid";
import { ImageFull } from "../../style/common";
import { ButtonLink } from "../button/index";
export interface NavbarProps {}

const Navbar: React.FunctionComponent<NavbarProps> = () => {
        const [active, setActive] = React.useState(true);

        return (
                <NavbarContainer>
                        <Layout justifyContent="space-between" alignItems="center">
                                <NavbarLogo href="">
                                        <ImageFull src="/icon/nav-logo.svg" alt="" width={120} height={32} />
                                </NavbarLogo>
                                <NavbarLeft>
                                        <SearchBox placeholder="Search" />
                                        <ButtonLink label="Login" link="#" />
                                        <ButtonLink label="Register" link="#" />
                                </NavbarLeft>
                                <NavbarBtnMobile onClick={() => setActive(!active)} className={active ? "active" : ""}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                </NavbarBtnMobile>
                        </Layout>
                </NavbarContainer>
        );
};

export default Navbar;
