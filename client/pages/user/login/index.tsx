import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useSelector } from 'react-redux';

//* Import Redux
import { store } from '../../../store';
import { UserLoginDto } from '../../../store/auth/dto';
import { authActions } from '../../../store/auth';
import { apiSelector } from '../../../store/api';
//* Import Style
import { AuthFormContainer, AuthContainer, AuthExtraLink, AuthForm } from '../../../style/views/user/authFormStyle';
import { Text } from '../../../style/typography';
import { Layout } from '../../../style/layout';
//* Import Component
import { LoginWithSocial } from '../../../components/form/loginWithSocial';
import { TextField, TextFieldPassword } from '../../../components/form/textField';
import { BtnFunc } from '../../../components/button';
import { HeadMeta } from '../../../components/head';

export interface UserLoginProps {}

const defaultValues: UserLoginDto = {
        password: '',
        username: '',
};

const UserLogin: React.FunctionComponent<UserLoginProps> = () => {
        const { register, handleSubmit } = useForm<UserLoginDto>({
                defaultValues,
        });
        const [error, setError] = useState<UserLoginDto>(defaultValues);
        const apiState = useSelector(apiSelector);

        const onSubmit = (data: UserLoginDto) => store.dispatch(authActions.loginUser(data));

        useEffect(() => {
                const { errorDetails, isError } = apiState;
                if (isError && errorDetails && errorDetails.username && errorDetails.password)
                        setError({ password: errorDetails.username, username: errorDetails.password });
        }, [apiState.isError]);

        return (
                <>
                        <HeadMeta pageTitle="Login" />
                        <AuthContainer $alignItems="center" $justifyContent="center">
                                <AuthFormContainer>
                                        <Layout $alignItems="center" $justifyContent="center" $gutter={1}>
                                                <Text as="h1" $type="h3" $textAlign="center">
                                                        Login with
                                                </Text>
                                                <Image src="/asset/icon/nav-logo.svg" alt="" height="32" width="120" />
                                        </Layout>
                                        <AuthForm onSubmit={handleSubmit(onSubmit)}>
                                                <TextField
                                                        name="username"
                                                        label="Username"
                                                        register={register}
                                                        errorMsg={error.username}
                                                        data-test="input:username"
                                                />
                                                <TextFieldPassword name="password" label="Password" register={register} errorMsg={error.password} />
                                                <AuthExtraLink>Forgot your password?</AuthExtraLink>
                                                <BtnFunc label="Sign In" isApiCall={true} />
                                        </AuthForm>
                                        <LoginWithSocial />
                                </AuthFormContainer>
                        </AuthContainer>
                </>
        );
};

export default UserLogin;
