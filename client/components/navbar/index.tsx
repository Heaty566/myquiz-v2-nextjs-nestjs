import * as React from "react";
import { NavbarContainer, NavbarLogo, NavbarLeft } from "./styled";
import { SearchBox } from "../form/searchBox";
export interface NavbarProps {}

import { Layout } from "../../styled/grid";
import { ImageFull } from "../../styled/common";
import { ButtonLink } from "../button/index";

const Navbar: React.FunctionComponent<NavbarProps> = () => {
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
                        </Layout>
                </NavbarContainer>
        );
};

export default Navbar;
