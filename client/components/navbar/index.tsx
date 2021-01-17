import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

//* Import
import { useClickOutSide } from '../../hooks/useClickOutSide';
import { ROUTER } from '../../constant/routerConstant';
import { NavbarContainer, NavBrand } from './style';
import { AuthState } from '../../store/auth';
import { NavDropDown } from './navDropDown';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { NavMenu } from './navMenu';

export interface NavbarProps {}

export const Navbar: React.FunctionComponent<NavbarProps> = () => {
        const [isActive, setIsActive] = useState(false);
        const dropDownRef = useClickOutSide({ callBackOutside: () => setIsActive(false), exceptElement: ['navbar__btn'] });
        const authState = useSelector<RootState, AuthState>((state) => state.auth);

        return (
                <NavbarContainer>
                        <Link href={ROUTER.home}>
                                <NavBrand href={ROUTER.home}>
                                        <Image src="/asset/icons/nav-logo.svg" height="38" width="148" alt="logo" aria-label="logo" />
                                </NavBrand>
                        </Link>
                        <NavMenu isActive={isActive} handleOnClick={() => setIsActive(!isActive)} authState={authState} />
                        <NavDropDown register={dropDownRef} authState={authState} isActive={isActive} handleOnClick={() => setIsActive(false)} />
                </NavbarContainer>
        );
};
