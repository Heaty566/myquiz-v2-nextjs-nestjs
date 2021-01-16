import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

//* Import Component
import { store, RootState } from '../../store';
import { UserLoginDto } from '../../store/auth/dto';
import { authActions } from '../../store/auth';
import { ApiState } from '../../store/api';
import { AuthFormContainer, AuthContainer, AuthExtraLink, AuthForm } from '../../components/views/user/authFormStyle';
import { Text } from '../../style/typography';
import { Layout } from '../../style/layout';
import { ROUTER } from '../../constant/routerConstant';
import { RouterHOC } from '../../HOC/routerHOC';
import { FormWithSocial } from '../../components/form/WithSocial';
import { TextField, TextFieldPassword } from '../../components/form/textField';
import { BtnFunc } from '../../components/button';
import { seoHead } from '../../helper/seoHead';
import { useLoading } from '../../hooks/useLoading';

export interface UserLoginProps {}

const defaultValues: UserLoginDto = { password: '', username: '' };

const Login: React.FunctionComponent<UserLoginProps> = () => {
        const { register, handleSubmit } = useForm<UserLoginDto>({
                defaultValues,
        });
        const [errors, setErrors] = useState<UserLoginDto>(defaultValues);
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const isLoading = useLoading();
        const onSubmit = (data: UserLoginDto) => store.dispatch(authActions.loginUser(data));

        useEffect(() => {
                const { isError, errorDetails } = apiState;

                if (isError) setErrors({ ...defaultValues, ...errorDetails });
                else setErrors(defaultValues);
        }, [apiState]);

        return (
                <>
                        {seoHead({ title: 'Login' })}
                        <AuthContainer $alignItems="center" $justifyContent="center">
                                <AuthFormContainer>
                                        <Layout $alignItems="center" $justifyContent="center" $gutter={1}>
                                                <Text as="h1" $type="h3" $textAlign="center">
                                                        Login with
                                                </Text>
                                                <Image src="/asset/icon/nav-logo.svg" alt="" height="32" width="120" />
                                        </Layout>
                                        <AuthForm onSubmit={handleSubmit(onSubmit)}>
                                                <TextField name="username" label="Username" register={register} errorMsg={errors.username} />
                                                <TextFieldPassword name="password" label="Password" register={register} errorMsg={errors.password} />
                                                <Link href={ROUTER.forgotPassword}>
                                                        <AuthExtraLink>Forgot your password?</AuthExtraLink>
                                                </Link>
                                                <BtnFunc label="Sign In" isLoading={isLoading} />
                                        </AuthForm>
                                        <FormWithSocial />
                                </AuthFormContainer>
                        </AuthContainer>
                </>
        );
};

const LoginRouter = (props: any) => <RouterHOC Component={Login} props={props} />;
export default LoginRouter;
