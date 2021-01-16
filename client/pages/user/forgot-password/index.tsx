import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

//* Import
import { store, RootState } from '../../../store';
import { ForgotPasswordDto } from '../../../store/auth/dto';
import { authActions } from '../../../store/auth';
import { ApiState } from '../../../store/api';
import { AuthFormContainer, AuthContainer, AuthForm } from '../../../components/views/user/authFormStyle';
import { Text } from '../../../style/typography';
import { RouterHOC } from '../../../HOC/routerHOC';
import { TextField } from '../../../components/form/textField';
import { TextFieldSuccessMsg } from '../../../components/form/textField/style.share';
import { BtnFunc } from '../../../components/button';
import { seoHead } from '../../../helper/seoHead';
import { useLoading } from '../../../hooks/useLoading';

export interface UserLoginProps {}

const defaultValues: ForgotPasswordDto = { email: '' };

const Login: React.FunctionComponent<UserLoginProps> = () => {
        const { register, handleSubmit } = useForm<ForgotPasswordDto>({
                defaultValues,
        });
        const [errors, setErrors] = useState<ForgotPasswordDto>(defaultValues);
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const isLoading = useLoading();
        const onSubmit = (data: ForgotPasswordDto) => store.dispatch(authActions.forgotPasswordCreate(data));

        useEffect(() => {
                const { isError, errorDetails } = apiState;

                if (isError) setErrors({ ...defaultValues, ...errorDetails });
                else setErrors(defaultValues);
        }, [apiState]);

        return (
                <>
                        {seoHead({ title: 'Forgot Password' })}
                        <AuthContainer $alignItems="center" $justifyContent="center">
                                <AuthFormContainer>
                                        <Text as="h1" $type="h3" $textAlign="center">
                                                Forgot Password
                                        </Text>
                                        <Text as="p" $type="h4">
                                                Enter your email address and we’ll send you a recovery link.
                                        </Text>
                                        {apiState.message && <TextFieldSuccessMsg>{apiState.message}</TextFieldSuccessMsg>}

                                        <AuthForm onSubmit={handleSubmit(onSubmit)}>
                                                <TextField name="email" label="Email" register={register} errorMsg={errors.email} />

                                                <BtnFunc label="Send an email" isLoading={isLoading} />
                                        </AuthForm>
                                </AuthFormContainer>
                        </AuthContainer>
                </>
        );
};

const LoginRouter = (props: any) => <RouterHOC Component={Login} props={props} />;
export default LoginRouter;
