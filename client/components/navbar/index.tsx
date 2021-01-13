import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

//* Style import
import { NavbarContainer, NavbarBrand, NavbarLeft, NavbarBtnMobile } from './style';
import { BtnLink } from '../button';

//*Import Component
import { NavbarUser } from './nUser';
import { NavbarMenu } from './nMenu';
import { FormSearchBox } from '../form/searchBox';
import { RootState } from '../../store/index';
import { AuthState } from '../../store/auth';
import { useSelector } from 'react-redux';

export interface NavbarProps {}

export const Navbar: React.FunctionComponent<NavbarProps> = () => {
        const [active, setActive] = useState(true);
        const authState = useSelector<RootState, AuthState>((state) => state.auth);

        return (
                <NavbarContainer $alignItems="center" $justifyContent="space-between">
                        <Link href="/">
                                <NavbarBrand href="/">
                                        <Image src="/asset/icon/nav-logo.svg" alt="" height="32" width="120" />
                                </NavbarBrand>
                        </Link>
                        <NavbarLeft>
                                <FormSearchBox placeholder="Search" />

                                {authState.isLogin ? (
                                        <NavbarUser user={authState} />
                                ) : (
                                        <>
                                                <BtnLink label="Login" link="/user/login" />
                                                <BtnLink label="Register" link="/user/register" />
                                        </>
                                )}
                        </NavbarLeft>
                        <NavbarBtnMobile onClick={() => setActive(!active)} className={active ? 'active' : ''}>
                                <div />
                                <div />
                                <div />
                        </NavbarBtnMobile>
                        <NavbarMenu user={authState} />
                </NavbarContainer>
        );
};
