import * as React from 'react';
import { SearchBox } from '../form/searchBox';

//* Style import
import { NavbarContainer, NavbarLogo, NavbarLeft, NavbarBtnMobile } from './style';
import { Layout } from '../../style/grid';
import { ButtonLink } from '../button';
import { ImageFull } from '../../style/common';

export interface NavbarProps {}

export const Navbar: React.FunctionComponent<NavbarProps> = () => {
        const [active, setActive] = React.useState(true);

        return (
                <NavbarContainer>
                        <Layout $justifyContent="space-between" $alignItems="center">
                                <NavbarLogo href="">
                                        <ImageFull src="/asset/icon/nav-logo.svg" alt="" $objectFit="contain" />
                                </NavbarLogo>
                                <NavbarLeft>
                                        <SearchBox placeholder="Search" />
                                        <ButtonLink label="Login" link="#" />
                                        <ButtonLink label="Register" link="#" />
                                </NavbarLeft>
                                <NavbarBtnMobile onClick={() => setActive(!active)} className={active ? 'active' : ''}>
                                        <span />
                                        <span />
                                        <span />
                                </NavbarBtnMobile>
                        </Layout>
                </NavbarContainer>
        );
};
