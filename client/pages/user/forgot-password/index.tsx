import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

//* Import
import { AuthFormContainer, AuthFormWrapper, AuthFormTitle, AuthFormSuccessMsg } from '../../../components/views/user/form';
import { InputText } from '../../../components/form/input/inputText';
import { ForgotPasswordDto } from '../../../store/auth/dto';
import { BtnFunc } from '../../../components/btnFunc';
import { RouterHOC } from '../../../HOC/routerHOC';
import { RootState, store } from '../../../store';
import { authActions } from '../../../store/auth';
import { seoHead } from '../../../helper/seoHead';
import { ApiState } from '../../../store/api';

export interface LoginProps {}

const initialValue: ForgotPasswordDto = {
        email: '',
};

const ForgotPassword: React.FunctionComponent<LoginProps> = () => {
        const apiState = useSelector<RootState, ApiState>((state) => state.api);

        const { register, handleSubmit } = useForm<ForgotPasswordDto>({
                defaultValues: initialValue,
        });
        const [errors, setErrors] = useState<ForgotPasswordDto>(initialValue);

        const handleOnSubmit = (data: ForgotPasswordDto) => {
                store.dispatch(authActions.forgotPasswordCreate(data));
        };

        useEffect(() => {
                const { isError, errorDetails } = apiState;

                if (isError) setErrors({ ...initialValue, ...errorDetails });
                else setErrors(initialValue);
        }, [apiState.isError]);

        return (
                <>
                        {seoHead({ title: 'Forgot Password', keyword: 'reset password, recovery password' })}
                        <AuthFormContainer onSubmit={handleSubmit(handleOnSubmit)}>
                                <AuthFormWrapper>
                                        <AuthFormTitle>
                                                <span>Forgot Password</span>
                                        </AuthFormTitle>

                                        <h4>Enter your email address and we’ll send you a recovery link.</h4>
                                        {apiState.message && <AuthFormSuccessMsg>{apiState.message}</AuthFormSuccessMsg>}
                                        <InputText errorMessage={errors.email} label="Email" name="email" register={register} />

                                        <BtnFunc label="Send An Email" isLoading={apiState.isLoading} />
                                </AuthFormWrapper>
                        </AuthFormContainer>
                </>
        );
};

const ForgotPasswordRouter = (props: any) => <RouterHOC Component={ForgotPassword} props={props} />;
export default ForgotPasswordRouter;
