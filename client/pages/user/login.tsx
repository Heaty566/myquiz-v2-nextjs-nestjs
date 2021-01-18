import { useEffect, useState } from 'react';
import Link from 'next/link';

//* Import
import { AuthFormContainer, AuthFormWrapper, AuthFormTitle, AuthFormLink } from '../../components/views/user/form';
import { InputText } from '../../components/form/input/inputText';
import { InputPassword } from '../../components/form/input/inputPassword';
import { BtnFunc } from '../../components/btnFunc';
import { UserLoginDto } from '../../store/auth/dto';
import { useForm } from 'react-hook-form';
import { LoginSocial } from '../../components/form/loginSocial';
import { ROUTER } from '../../constant/routerConstant';
import { RootState, store } from '../../store';
import { authActions } from '../../store/auth';
import { useSelector } from 'react-redux';
import { ApiState } from '../../store/api';
import { RouterHOC } from '../../HOC/routerHOC';
import { seoHead } from '../../helper/seoHead';

export interface LoginProps {}

const initialValue: UserLoginDto = {
        username: '',
        password: '',
};

const Login: React.FunctionComponent<LoginProps> = () => {
        const authState = useSelector<RootState, ApiState>((state) => state.api);
        const { register, handleSubmit } = useForm<UserLoginDto>({
                defaultValues: initialValue,
        });
        const [errors, setErrors] = useState<UserLoginDto>(initialValue);

        const handleOnSubmit = (data: UserLoginDto) => {
                store.dispatch(authActions.loginUser(data));
        };

        useEffect(() => {
                const { isError, errorDetails } = authState;

                if (isError) setErrors({ ...initialValue, ...errorDetails });
                else setErrors(initialValue);
        }, [authState.isError]);

        return (
                <>
                        {seoHead({ title: 'Login' })}
                        <AuthFormContainer onSubmit={handleSubmit(handleOnSubmit)}>
                                <AuthFormWrapper>
                                        <AuthFormTitle>
                                                <span>Login Your Account</span>
                                        </AuthFormTitle>
                                        <InputText errorMessage={errors.username} label="Username" name="username" register={register} />
                                        <InputPassword errorMessage={errors.password} label="Password" name="password" register={register} />
                                        <Link href={ROUTER.forgotPassword}>
                                                <AuthFormLink href={ROUTER.forgotPassword}>Forgot your password?</AuthFormLink>
                                        </Link>
                                        <BtnFunc label="Register" />
                                        <LoginSocial />
                                </AuthFormWrapper>
                        </AuthFormContainer>
                </>
        );
};

const LoginRouter = (props: any) => <RouterHOC Component={Login} props={props} />;
export default LoginRouter;
