import * as React from 'react';
import { FormSearchBox } from '../form/searchBox';

//* Style import
import { NavbarContainer, NavbarBrand, NavbarLeft, NavbarBtnMobile } from './style';
import { BtnLink } from '../button';
import { ImageFull } from '../../style/common';

export interface NavbarProps {}

export const Navbar: React.FunctionComponent<NavbarProps> = () => {
        const [active, setActive] = React.useState(true);

        return (
                <NavbarContainer $alignItems="center" $justifyContent="space-between">
                        <NavbarBrand href="/">
                                <ImageFull src="/asset/icon/nav-logo.svg" alt="" $objectFit="contain" />
                        </NavbarBrand>
                        <NavbarLeft>
                                <FormSearchBox placeholder="Search" />
                                <BtnLink label="Login" link="#" />
                                <BtnLink label="Register" link="#" />
                        </NavbarLeft>
                        <NavbarBtnMobile onClick={() => setActive(!active)} className={active ? 'active' : ''}>
                                <div />
                                <div />
                                <div />
                        </NavbarBtnMobile>
                </NavbarContainer>
        );
};
