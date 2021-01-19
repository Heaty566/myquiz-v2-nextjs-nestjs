import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'universal-cookie';

//* Import
import { useClickOutSide } from '../../hooks/useClickOutSide';
import { ROUTER } from '../../constant/routerConstant';
import { NavbarContainer, NavBrand } from './style';
import { AuthState } from '../../store/auth';
import { NavDropDown } from './navDropDown';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../store';
import { NavMenu } from './navMenu';
import { authActions } from '../../store/auth';

export interface NavbarProps {}

export const Navbar: React.FunctionComponent<NavbarProps> = () => {
        const [isActive, setIsActive] = useState(false);
        const dropDownRef = useClickOutSide({ callBackOutside: () => setIsActive(false), exceptElement: ['navbar__btn'] });
        const authState = useSelector<RootState, AuthState>((state) => state.auth);

        const handleOnLogout = useCallback(() => {
                const cookies = new Cookies();
                cookies.set('re-token', '', { maxAge: -999 });
                cookies.set('auth-token', '', { maxAge: -999 });
                store.dispatch(authActions.resetAuth());
        }, []);

        return (
                <NavbarContainer>
                        <Link href={ROUTER.home}>
                                <NavBrand href={ROUTER.home}>
                                        <Image src="/asset/icons/nav-logo.svg" height="38" width="148" alt="logo" aria-label="logo" />
                                </NavBrand>
                        </Link>
                        <NavMenu isActive={isActive} handleOnClick={() => setIsActive(!isActive)} authState={authState} />
                        <NavDropDown
                                register={dropDownRef}
                                authState={authState}
                                isActive={isActive}
                                handleOnClick={() => setIsActive(false)}
                                handleOnLogout={() => handleOnLogout()}
                        />
                </NavbarContainer>
        );
};
