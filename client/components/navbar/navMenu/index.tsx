import * as React from 'react';
import Image from 'next/image';

//* Import
import { NavMenuContainer, NavMenuBtn, NavAvatar } from './style';
import { ROUTER } from '../../../constant/routerConstant';
import { SearchBox } from '../../form/searchBox';
import { AuthState } from '../../../store/auth';
import { BtnLink } from '../../btnLink';

export interface NavMenuProps {
        handleOnClick: Function;
        isActive: boolean;
        authState: AuthState;
}

export const NavMenu: React.FunctionComponent<NavMenuProps> = ({ handleOnClick, isActive, authState }) => {
        const avatarUrl = authState.avatarUrl ? authState.avatarUrl : '/asset/images/default-avatar.png';

        return (
                <NavMenuContainer>
                        <SearchBox />

                        {authState.isLogin ? (
                                <NavAvatar>
                                        <Image src={avatarUrl} height="40" width="40" alt={authState.fullName} />
                                </NavAvatar>
                        ) : (
                                <>
                                        <BtnLink label="Register" url={ROUTER.register} />
                                        <BtnLink label="Login" url={ROUTER.login} />
                                </>
                        )}
                        <NavMenuBtn
                                className={` navbar__btn ${isActive && 'active'} ${!authState.isLogin && 'login'}`}
                                onClick={() => handleOnClick()}
                        >
                                <div className="navbar__btn" />
                                <div className="navbar__btn" />
                                <div className="navbar__btn" />
                                <div className="navbar__btn" />
                                <div className="navbar__btn" />
                                <div className="navbar__btn" />
                                <div className="navbar__btn" />
                                <div className="navbar__btn" />
                                <div className="navbar__btn" />
                        </NavMenuBtn>
                </NavMenuContainer>
        );
};
