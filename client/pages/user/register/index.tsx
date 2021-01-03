import * as React from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useSelector } from 'react-redux';

//*Import Style
import { AuthFormContainer, AuthContainer, AuthExtraLink, AuthForm } from '../../../style/views/user/authFormStyle';
import { Text } from '../../../style/typography';
import { Layout } from '../../../style/layout';
//*Import Component
import { TextField, TextFieldPassword } from '../../../components/form/textField';
import { LoginWithSocial } from '../../../components/form/loginWithSocial';
import { BtnFunc } from '../../../components/button';
import { HeadMeta } from '../../../components/head';
//*Import Redux
import { store } from '../../../store';
import { UserRegisterDto } from '../../../store/auth/dto';
import { authActions } from '../../../store/auth';
import { apiSelector } from '../../../store/api';
export interface UserLoginProps {}

const defaultValues: UserRegisterDto = {
        password: '',
        username: '',
        confirmPassword: '',
        fullName: '',
};

const UserRegister: React.FunctionComponent<UserLoginProps> = () => {
        const { register, handleSubmit } = useForm<UserRegisterDto>({ defaultValues });
        const [errors, setErrors] = React.useState<UserRegisterDto>(defaultValues);
        const apiState = useSelector(apiSelector);

        const onSubmit = (data: UserRegisterDto) => store.dispatch(authActions.registerUser(data));

        React.useEffect(() => {
                const { errorDetails, isError } = apiState;
                if (
                        isError &&
                        errorDetails &&
                        errorDetails.username &&
                        errorDetails.password &&
                        errorDetails.confirmPassword &&
                        errorDetails.fullName
                )
                        setErrors({
                                password: errorDetails.username,
                                username: errorDetails.password,
                                confirmPassword: errorDetails.confirmPassword,
                                fullName: errorDetails.fullName,
                        });
        }, [apiState.isError]);

        return (
                <>
                        <HeadMeta pageTitle="Register" />
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
                                                <AuthExtraLink>Sign in instead?</AuthExtraLink>
                                                <BtnFunc label="Sign Up" />
                                        </AuthForm>

                                        <LoginWithSocial />
                                </AuthFormContainer>
                        </AuthContainer>
                </>
        );
};

export default UserRegister;
