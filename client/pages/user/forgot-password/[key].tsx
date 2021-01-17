import { useEffect, useState } from 'react';

//* Import
import { useRouter } from 'next/router';
import { AuthFormContainer, AuthFormWrapper, AuthFormTitle, AuthFormSuccessMsg } from '../../../components/views/user/form';
import { InputPassword } from '../../../components/form/input/inputPassword';
import { BtnFunc } from '../../../components/btnFunc';
import { ForgotPasswordUpdateDto } from '../../../store/auth/dto';
import { useForm } from 'react-hook-form';
import { ROUTER } from '../../../constant/routerConstant';
import { RootState, store } from '../../../store';
import { authActions } from '../../../store/auth';
import { useSelector } from 'react-redux';
import { ApiState } from '../../../store/api';
import { RouterHOC } from '../../../HOC/routerHOC';
import { seoHead } from '../../../helper/seoHead';

export interface LoginProps {}

const initialValue: ForgotPasswordUpdateDto = {
        confirmPassword: '',
        newPassword: '',
        resetKey: '',
};

const Register: React.FunctionComponent<LoginProps> = () => {
        const authState = useSelector<RootState, ApiState>((state) => state.api);
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
                const { isError, errorDetails, message } = authState;

                if (isError) setErrors({ ...initialValue, ...errorDetails });
                else setErrors(initialValue);

                if (message) setTimeout(() => router.push(ROUTER.login), 2000);
        }, [authState.isError, authState.message]);

        return (
                <>
                        {seoHead({ title: 'Reset Password', keyword: 'reset password, recovery password' })}
                        <AuthFormContainer onSubmit={handleSubmit(handleOnSubmit)}>
                                <AuthFormWrapper>
                                        <AuthFormTitle>
                                                <span>Reset Your Password</span>
                                        </AuthFormTitle>
                                        {authState.message && <AuthFormSuccessMsg>{authState.message}</AuthFormSuccessMsg>}
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
                                        <BtnFunc label="Update" />
                                </AuthFormWrapper>
                        </AuthFormContainer>
                </>
        );
};

const RegisterRouter = (props: any) => <RouterHOC Component={Register} props={props} />;
export default RegisterRouter;
