import * as React from 'react';
import { UserInfo } from '../../../store/auth';
import { NavbarUserBtn, NavbarUserContainer } from './style';
import Image from 'next/image';

export interface NavbarUserProps {
        user: UserInfo;
}

export const NavbarUser: React.FunctionComponent<NavbarUserProps> = ({ user }) => {
        const userAvatar = user.avatarUrl ? user.avatarUrl : '/asset/images/default-avatar.png';

        return (
                <NavbarUserContainer $alignItems="center" $justifyContent="space-between">
                        <Image src={userAvatar} alt={user.fullName} height="32" width="32" />
                        <NavbarUserBtn>
                                <div />
                                <div />
                                <div />
                        </NavbarUserBtn>
                </NavbarUserContainer>
        );
};
