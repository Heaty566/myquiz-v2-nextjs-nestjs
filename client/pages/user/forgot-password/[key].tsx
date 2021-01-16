import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

//* Import
import { store, RootState } from '../../../store';
import { ForgotPasswordUpdateDto } from '../../../store/auth/dto';
import { authActions } from '../../../store/auth';
import { ApiState } from '../../../store/api';
import { AuthFormContainer, AuthContainer, AuthForm } from '../../../components/views/user/authFormStyle';
import { Text } from '../../../style/typography';
import { RouterHOC } from '../../../HOC/routerHOC';
import { TextFieldPassword } from '../../../components/form/textField';
import { TextFieldSuccessMsg } from '../../../components/form/textField/style.share';
import { BtnFunc } from '../../../components/button';
import { seoHead } from '../../../helper/seoHead';
import { useLoading } from '../../../hooks/useLoading';
import { ROUTER } from '../../../constant/routerConstant';

export interface UserLoginProps {}

const defaultValues: ForgotPasswordUpdateDto = { confirmPassword: '', newPassword: '', resetKey: '' };

const Login: React.FunctionComponent<UserLoginProps> = () => {
        const { register, handleSubmit } = useForm<ForgotPasswordUpdateDto>({
                defaultValues,
        });

        const router = useRouter();
        const [errors, setErrors] = useState<ForgotPasswordUpdateDto>(defaultValues);
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const isLoading = useLoading();

        const onSubmit = (data: ForgotPasswordUpdateDto) => {
                const { key = '' } = router.query;
                if (typeof key === 'string') {
                        store.dispatch(authActions.forgotPasswordUpdate({ ...data, resetKey: key }));
                }
        };

        useEffect(() => {
                const { isError, errorDetails, message } = apiState;

                if (isError) setErrors({ ...defaultValues, ...errorDetails });
                else setErrors(defaultValues);

                if (message) setTimeout(() => router.push(ROUTER.login), 2000);
        }, [apiState]);

        return (
                <>
                        {seoHead({ title: 'Forgot Password' })}
                        <AuthContainer $alignItems="center" $justifyContent="center">
                                <AuthFormContainer>
                                        <Text as="h1" $type="h3" $textAlign="center">
                                                Reset Password
                                        </Text>
                                        {apiState.message && <TextFieldSuccessMsg>{apiState.message}</TextFieldSuccessMsg>}

                                        <AuthForm onSubmit={handleSubmit(onSubmit)}>
                                                <TextFieldPassword
                                                        name="newPassword"
                                                        label="New Password"
                                                        register={register}
                                                        errorMsg={errors.newPassword}
                                                />
                                                <TextFieldPassword
                                                        name="confirmPassword"
                                                        label="Confirm Password"
                                                        register={register}
                                                        errorMsg={errors.confirmPassword}
                                                />

                                                <BtnFunc label="Update Password" isLoading={isLoading} />
                                        </AuthForm>
                                </AuthFormContainer>
                        </AuthContainer>
                </>
        );
};

const LoginRouter = (props: any) => <RouterHOC Component={Login} props={props} />;
export default LoginRouter;
