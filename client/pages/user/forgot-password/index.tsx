import { useEffect, useState } from 'react';

//* Import
import { AuthFormContainer, AuthFormWrapper, AuthFormTitle, AuthFormSuccessMsg } from '../../../components/views/user/form';
import { InputText } from '../../../components/form/input/inputText';
import { BtnFunc } from '../../../components/btnFunc';
import { ForgotPasswordDto } from '../../../store/auth/dto';
import { useForm } from 'react-hook-form';
import { RootState, store } from '../../../store';
import { authActions } from '../../../store/auth';
import { useSelector } from 'react-redux';
import { ApiState } from '../../../store/api';
import { RouterHOC } from '../../../HOC/routerHOC';
import { seoHead } from '../../../helper/seoHead';

export interface LoginProps {}

const initialValue: ForgotPasswordDto = {
        email: '',
};

const Register: React.FunctionComponent<LoginProps> = () => {
        const authState = useSelector<RootState, ApiState>((state) => state.api);

        const { register, handleSubmit } = useForm<ForgotPasswordDto>({
                defaultValues: initialValue,
        });
        const [errors, setErrors] = useState<ForgotPasswordDto>(initialValue);

        const handleOnSubmit = (data: ForgotPasswordDto) => {
                store.dispatch(authActions.forgotPasswordCreate(data));
        };

        useEffect(() => {
                const { isError, errorDetails } = authState;

                if (isError) setErrors({ ...initialValue, ...errorDetails });
                else setErrors(initialValue);
        }, [authState.isError]);

        return (
                <>
                        {seoHead({ title: 'Forgot Password', keyword: 'reset password, recovery password' })}
                        <AuthFormContainer onSubmit={handleSubmit(handleOnSubmit)}>
                                <AuthFormWrapper>
                                        <AuthFormTitle>
                                                <span>Forgot Password</span>
                                        </AuthFormTitle>

                                        <h4>Enter your email address and we’ll send you a recovery link.</h4>
                                        {authState.message && <AuthFormSuccessMsg>{authState.message}</AuthFormSuccessMsg>}
                                        <InputText errorMessage={errors.email} label="Email" name="email" register={register} />

                                        <BtnFunc label="Send An Email" />
                                </AuthFormWrapper>
                        </AuthFormContainer>
                </>
        );
};

const RegisterRouter = (props: any) => <RouterHOC Component={Register} props={props} />;
export default RegisterRouter;
