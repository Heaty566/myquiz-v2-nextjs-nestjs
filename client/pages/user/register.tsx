import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

//*Import Style
import { AuthFormContainer, AuthContainer, AuthExtraLink, AuthForm } from '../../components/views/user/authFormStyle';
import { Text } from '../../style/typography';
import { Layout } from '../../style/layout';
//*Import Component
import { TextField, TextFieldPassword } from '../../components/form/textField';
import { FormWithSocial } from '../../components/form/WithSocial';
import { BtnFunc } from '../../components/button';
import { seoHead } from '../../helper/seoHead';
//*Import Redux
import { store, RootState } from '../../store';
import { UserRegisterDto } from '../../store/auth/dto';
import { ApiState } from '../../store/api';
import { authActions } from '../../store/auth';
import { ROUTER } from '../../constant/routerConstant';
import { RouterHOC } from '../../HOC/routerHOC';
import { useLoading } from '../../hooks/useLoading';
export interface UserLoginProps {}

const defaultValues: UserRegisterDto = {
        password: '',
        username: '',
        confirmPassword: '',
        fullName: '',
};

const Register: React.FunctionComponent<UserLoginProps> = () => {
        const { register, handleSubmit } = useForm<UserRegisterDto>({ defaultValues });
        const [errors, setErrors] = useState<UserRegisterDto>(defaultValues);
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const isLoading = useLoading();
        const onSubmit = (data: UserRegisterDto) => store.dispatch(authActions.registerUser(data));

        useEffect(() => {
                const { errorDetails, isError } = apiState;

                if (isError && errorDetails) setErrors({ ...errors, ...errorDetails });
                else setErrors(defaultValues);
        }, [apiState]);

        return (
                <>
                        {seoHead({ title: 'Register' })}
                        <AuthContainer $alignItems="center" $justifyContent="center">
                                <AuthFormContainer>
                                        <Layout $alignItems="center" $justifyContent="center" $gutter={1}>
                                                <Text as="h1" $type="h3" $textAlign="center">
                                                        Login with
                                                </Text>
                                                <Image src="/asset/icon/nav-logo.svg" alt="" height="32" width="120" />
                                        </Layout>
                                        <AuthForm onSubmit={handleSubmit(onSubmit)}>
                                                <TextField name="fullName" label="Full name" register={register} errorMsg={errors.fullName} />
                                                <TextField name="username" label="Username" register={register} errorMsg={errors.username} />
                                                <TextFieldPassword name="password" label="Password" register={register} errorMsg={errors.password} />
                                                <TextFieldPassword
                                                        name="confirmPassword"
                                                        label="Confirm Password"
                                                        register={register}
                                                        errorMsg={errors.confirmPassword}
                                                />
                                                <Link href={ROUTER.login}>
                                                        <AuthExtraLink>Sign in instead?</AuthExtraLink>
                                                </Link>
                                                <BtnFunc label="Sign Up" isLoading={isLoading} />
                                        </AuthForm>

                                        <FormWithSocial />
                                </AuthFormContainer>
                        </AuthContainer>
                </>
        );
};

const RegisterRouter = (props: any) => <RouterHOC Component={Register} props={props} />;
export default RegisterRouter;
