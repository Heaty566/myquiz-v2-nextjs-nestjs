import * as React from 'react';
import { UserInfo } from '../../../store/auth';
import { NavbarMainContainer } from './style';
import Image from 'next/image';

export interface NavbarMenuProps {
        user: UserInfo;
}

export const NavbarMenu: React.FunctionComponent<NavbarMenuProps> = ({ user }) => {
        const userAvatar = user.avatarUrl ? user.avatarUrl : '/asset/images/default-avatar.png';

        return (
                <NavbarMainContainer $alignItems="center" $justifyContent="space-between">
                        menu
                </NavbarMainContainer>
        );
};
