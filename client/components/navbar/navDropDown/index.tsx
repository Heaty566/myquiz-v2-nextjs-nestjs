import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

//* Import
import { ROUTER } from '../../../constant/routerConstant';
import { NavDropDownContainer, NavDropDownItem, NavDropDownLink, NavDropDownIcon } from './style';
import { AuthState } from '../../../store/auth';

export interface NavDropDownProps {
        authState: AuthState;
        isActive: boolean;
        register: React.RefObject<HTMLElement>;
        handleOnClick: Function;
}

const arrData = [
        {
                label: 'Login',
                imageUrl: 'profile.svg',
                link: ROUTER.login,
                isLogin: true,
        },
        {
                label: 'Register',
                imageUrl: 'register.svg',
                link: ROUTER.register,
                isLogin: true,
        },
        {
                label: 'Pricing',
                imageUrl: 'pricing.svg',
                link: ROUTER.memberPrice,
                isLogin: false,
        },
        {
                label: 'Take Exam',
                imageUrl: 'take-exam.svg',
                link: ROUTER.takeExam,
                isLogin: false,
        },
        {
                label: 'Take Quiz',
                imageUrl: 'take-exam.svg',
                link: ROUTER.takeQuiz,
                isLogin: false,
        },
        {
                label: 'Create New Quiz',
                imageUrl: 'note.svg',
                link: ROUTER.createNewQuiz,
                isLogin: false,
        },
        {
                label: 'Help Center',
                imageUrl: 'question.svg',
                link: ROUTER.helpCenter,
                isLogin: false,
        },
];

export const NavDropDown: React.FunctionComponent<NavDropDownProps> = ({ authState, isActive, register, handleOnClick }) => {
        return (
                <NavDropDownContainer className={`${isActive && 'active'}`} ref={register}>
                        {arrData.map((item) => {
                                if (item.isLogin && item.isLogin === authState.isLogin) return null;

                                return (
                                        <Link href={item.link} key={item.label}>
                                                <NavDropDownItem onClick={() => handleOnClick()}>
                                                        <NavDropDownLink href={item.link}>
                                                                <NavDropDownIcon>
                                                                        <Image
                                                                                src={`/asset/icons/${item.imageUrl}`}
                                                                                alt={item.label}
                                                                                height="24"
                                                                                width="24"
                                                                        />
                                                                </NavDropDownIcon>
                                                                {item.label}
                                                        </NavDropDownLink>
                                                </NavDropDownItem>
                                        </Link>
                                );
                        })}
                </NavDropDownContainer>
        );
};
