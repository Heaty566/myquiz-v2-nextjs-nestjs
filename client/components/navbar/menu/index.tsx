import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

//* Import
import { NavbarMenuList, NavbarMenuItem, NavbarMenuLink, NavbarDivider } from './style';
import { AuthState } from '../../../store/auth';
import { ROUTER } from '../../../constant/routerConstant';
export interface NavbarMenuProps {
        user: AuthState;
        isActive: boolean;
        register: React.RefObject<HTMLUListElement>;
        handleOnLogout: Function;
        handleOnClick: Function;
}

export const NavbarMenu: React.FunctionComponent<NavbarMenuProps> = ({
        user: { isLogin, fullName },
        isActive,
        register,
        handleOnLogout,
        handleOnClick,
}) => {
        return (
                <NavbarMenuList ref={register} className={isActive ? 'active' : ''}>
                        {!isLogin ? (
                                <>
                                        <NavbarMenuItem onClick={() => handleOnClick()}>
                                                <Link href={ROUTER.login}>
                                                        <NavbarMenuLink href={ROUTER.login}>
                                                                <Image src="/asset/icon/profile.svg" alt="profile icon" height="24" width="24" />
                                                                <p>Login</p>
                                                        </NavbarMenuLink>
                                                </Link>
                                        </NavbarMenuItem>
                                        <NavbarMenuItem onClick={() => handleOnClick()}>
                                                <Link href={ROUTER.register}>
                                                        <NavbarMenuLink href={ROUTER.register}>
                                                                <Image src="/asset/icon/register.svg" alt="register icon" height="24" width="24" />
                                                                <p>Register</p>
                                                        </NavbarMenuLink>
                                                </Link>
                                        </NavbarMenuItem>
                                </>
                        ) : (
                                <NavbarMenuItem onClick={() => handleOnClick()}>
                                        <Link href={ROUTER.user}>
                                                <NavbarMenuLink href={ROUTER.user}>
                                                        <Image src="/asset/icon/profile.svg" alt="profile icon" height="24" width="24" />
                                                        <p>{fullName}</p>
                                                </NavbarMenuLink>
                                        </Link>
                                </NavbarMenuItem>
                        )}
                        <NavbarMenuItem onClick={() => handleOnClick()}>
                                <Link href={ROUTER.memberPrice}>
                                        <NavbarMenuLink href={ROUTER.memberPrice}>
                                                <Image src="/asset/icon/pricing.svg" alt="pricing icon" height="24" width="24" />
                                                <p>Pricing</p>
                                        </NavbarMenuLink>
                                </Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem onClick={() => handleOnClick()}>
                                <Link href={ROUTER.takeExam}>
                                        <NavbarMenuLink href={ROUTER.takeQuiz}>
                                                <Image src="/asset/icon/take-exam.svg" alt="take exam icon" height="24" width="24" />
                                                <p>Take Exam</p>
                                        </NavbarMenuLink>
                                </Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem onClick={() => handleOnClick()}>
                                <Link href={ROUTER.takeQuiz}>
                                        <NavbarMenuLink href={ROUTER.takeQuiz}>
                                                <Image src="/asset/icon/take-exam.svg" alt="take exam icon" height="24" width="24" />
                                                <p>Take Quiz</p>
                                        </NavbarMenuLink>
                                </Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem onClick={() => handleOnClick()}>
                                <Link href={ROUTER.createNewQuiz}>
                                        <NavbarMenuLink href={ROUTER.createNewQuiz}>
                                                <Image src="/asset/icon/note.svg" alt="note icon" height="24" width="24" />
                                                <p>Create new quiz</p>
                                        </NavbarMenuLink>
                                </Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem onClick={() => handleOnClick()}>
                                <Link href={ROUTER.helpCenter}>
                                        <NavbarMenuLink href={ROUTER.helpCenter}>
                                                <Image src="/asset/icon/question.svg" alt="question icon" height="24" width="24" />
                                                <p>Help center</p>
                                        </NavbarMenuLink>
                                </Link>
                        </NavbarMenuItem>
                        {isLogin && (
                                <NavbarMenuItem>
                                        <NavbarMenuLink as="button" onClick={() => handleOnLogout()}>
                                                <Image src="/asset/icon/logout.svg" alt="logout icon" height="24" width="24" />
                                                <p>Log out</p>
                                        </NavbarMenuLink>
                                </NavbarMenuItem>
                        )}
                        <NavbarMenuItem>
                                <NavbarDivider />
                        </NavbarMenuItem>
                        <NavbarMenuItem onClick={() => handleOnClick()}>
                                <Link href={ROUTER.helpCenter}>
                                        <NavbarMenuLink href={ROUTER.helpCenter}>
                                                <Image src="/asset/icon/question.svg" alt="question icon" height="24" width="24" />
                                                <p>Help center</p>
                                        </NavbarMenuLink>
                                </Link>
                        </NavbarMenuItem>
                </NavbarMenuList>
        );
};
