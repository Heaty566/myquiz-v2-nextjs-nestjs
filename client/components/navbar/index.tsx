import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import { NavbarContainer, NavbarBrand, NavbarLeft, NavbarBtnMobile } from './style';
import { store } from '../../store';
import { authActions } from '../../store/auth';
import { BtnLink } from '../button';
import { ROUTER } from '../../constant/routerConstant';
import { NavbarUser } from './user';
import { NavbarMenu } from './menu';
import { FormSearchBox } from '../form/searchBox';
import { RootState } from '../../store/index';
import { AuthState } from '../../store/auth';
import { useSelector } from 'react-redux';
import { useClickOutSide } from '../../hooks/useClickOutSide';
export interface NavbarProps {}

export const Navbar: React.FunctionComponent<NavbarProps> = () => {
        const [isActive, setIsActive] = useState(false);
        const authState = useSelector<RootState, AuthState>((state) => state.auth);
        const menuListRef = useClickOutSide<HTMLUListElement>({ callBackOutside: () => setIsActive(false), exceptElement: ['navbar__btn'] });

        const handleOnLogout = useCallback(() => {
                const cookies = new Cookies();
                cookies.set('re-token', '', { maxAge: -999 });
                cookies.set('auth-token', '', { maxAge: -999 });
                store.dispatch(authActions.resetAuth());
        }, []);

        return (
                <NavbarContainer $alignItems="center" $justifyContent="space-between">
                        <Link href={ROUTER.home}>
                                <NavbarBrand href="/">
                                        <Image src="/asset/icon/nav-logo.svg" alt="" height="32" width="120" />
                                </NavbarBrand>
                        </Link>
                        <NavbarLeft>
                                <FormSearchBox placeholder="Search" />

                                {authState.isLogin ? (
                                        <NavbarUser user={authState} onClick={() => setIsActive(!isActive)} />
                                ) : (
                                        <>
                                                <BtnLink label="Login" link={ROUTER.login} />
                                                <BtnLink label="Register" link={ROUTER.register} />
                                        </>
                                )}
                        </NavbarLeft>
                        <NavbarBtnMobile onClick={() => setIsActive(!isActive)} className={isActive ? 'active navbar__btn' : 'navbar__btn'}>
                                <div className="navbar__btn" />
                                <div className="navbar__btn" />
                                <div className="navbar__btn" />
                        </NavbarBtnMobile>
                        <NavbarMenu
                                register={menuListRef}
                                user={authState}
                                isActive={isActive}
                                handleOnLogout={handleOnLogout}
                                handleOnClick={() => setIsActive(false)}
                        />
                </NavbarContainer>
        );
};
