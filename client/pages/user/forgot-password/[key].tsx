import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

//* Import
import { AuthFormContainer, AuthFormWrapper, AuthFormTitle, AuthFormSuccessMsg } from '../../../components/views/user/form';
import { RootState, store } from '../../../store';
import { InputPassword } from '../../../components/form/input/inputPassword';
import { ForgotPasswordUpdateDto } from '../../../store/auth/dto';
import { ROUTER } from '../../../constant/routerConstant';
import { BtnFunc } from '../../../components/btnFunc';
import { RouterHOC } from '../../../HOC/routerHOC';
import { seoHead } from '../../../helper/seoHead';
import { authActions } from '../../../store/auth';
import { ApiState } from '../../../store/api';
import { useSelector } from 'react-redux';

export interface LoginProps {}

const initialValue: ForgotPasswordUpdateDto = {
        confirmPassword: '',
        newPassword: '',
        resetKey: '',
};

const ForgotPasswordUpdate: React.FunctionComponent<LoginProps> = () => {
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const router = useRouter();
        const { register, handleSubmit } = useForm<ForgotPasswordUpdateDto>({
                defaultValues: initialValue,
        });
        const [errors, setErrors] = useState<ForgotPasswordUpdateDto>(initialValue);

        const handleOnSubmit = (data: ForgotPasswordUpdateDto) => {
                const { key = '' } = router.query;
                if (typeof key === 'string') {
                        store.dispatch(authActions.forgotPasswordUpdate({ ...data, resetKey: key }));
                }
        };

        useEffect(() => {
                const { isError, errorDetails, message } = apiState;

                if (isError) setErrors({ ...initialValue, ...errorDetails });
                else setErrors(initialValue);

                if (message) setTimeout(() => router.push(ROUTER.login), 2000);
        }, [apiState.isError, apiState.message]);

        return (
                <>
                        {seoHead({ title: 'Reset Password', canonical: '/user/forgot-password', keyword: 'reset password, recovery password' })}
                        <AuthFormContainer>
                                <AuthFormWrapper onSubmit={handleSubmit(handleOnSubmit)} role="form">
                                        <AuthFormTitle>
                                                <span>Reset Your Password</span>
                                        </AuthFormTitle>
                                        {apiState.message && <AuthFormSuccessMsg>{apiState.message}</AuthFormSuccessMsg>}
                                        <InputPassword
                                                errorMessage={errors.newPassword}
                                                label="New Password"
                                                name="newPassword"
                                                register={register}
                                        />
                                        <InputPassword
                                                errorMessage={errors.confirmPassword}
                                                label="Confirm Password"
                                                name="confirmPassword"
                                                register={register}
                                        />
                                        <BtnFunc label="Update" isLoading={apiState.isLoading} />
                                </AuthFormWrapper>
                        </AuthFormContainer>
                </>
        );
};

const ForgotPasswordUpdateRouter = (props: any) => <RouterHOC Component={ForgotPasswordUpdate} props={props} />;
export default ForgotPasswordUpdateRouter;
