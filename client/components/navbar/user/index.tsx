import * as React from 'react';
import Image from 'next/image';

//* Import
import { NavbarUserBtn, NavbarUserContainer } from './style';
import { UserInfo } from '../../../store/auth';

export interface NavbarUserProps {
        user: UserInfo;
        onClick: Function;
}

export const NavbarUser: React.FunctionComponent<NavbarUserProps> = ({ user, onClick }) => {
        const userAvatar = user.avatarUrl ? user.avatarUrl : '/asset/images/default-avatar.png';

        return (
                <NavbarUserContainer $alignItems="center" $justifyContent="space-between">
                        <NavbarUserBtn onClick={() => onClick()} className="navbar__btn">
                                <Image src="/asset/icon/btn-menu.svg" alt="menu" height="28" width="28" className="navbar__btn" />
                        </NavbarUserBtn>
                        <Image src={userAvatar} alt={user.fullName} height="32" width="32" />
                </NavbarUserContainer>
        );
};
