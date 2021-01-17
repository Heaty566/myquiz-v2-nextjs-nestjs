import { useEffect, useState } from 'react';
import Link from 'next/link';

//* Import
import { AuthFormContainer, AuthFormWrapper, AuthFormTitle, AuthFormLink } from '../../components/views/user/form';
import { InputText } from '../../components/form/input/inputText';
import { InputPassword } from '../../components/form/input/inputPassword';
import { BtnFunc } from '../../components/btnFunc';
import { UserRegisterDto } from '../../store/auth/dto';
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

const initialValue: UserRegisterDto = {
        username: '',
        password: '',
        confirmPassword: '',
        fullName: '',
};

const Register: React.FunctionComponent<LoginProps> = () => {
        const authState = useSelector<RootState, ApiState>((state) => state.api);
        const { register, handleSubmit } = useForm<UserRegisterDto>({
                defaultValues: initialValue,
        });
        const [errors, setErrors] = useState<UserRegisterDto>(initialValue);

        const handleOnSubmit = (data: UserRegisterDto) => {
                store.dispatch(authActions.registerUser(data));
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
                                                <span>Register New Account</span>
                                        </AuthFormTitle>
                                        <InputText errorMessage={errors.fullName} label="Full Name" name="fullName" register={register} />
                                        <InputText errorMessage={errors.username} label="Username" name="username" register={register} />
                                        <InputPassword errorMessage={errors.password} label="Password" name="password" register={register} />
                                        <InputPassword
                                                errorMessage={errors.confirmPassword}
                                                label="Confirm Password"
                                                name="confirmPassword"
                                                register={register}
                                        />
                                        <Link href={ROUTER.login}>
                                                <AuthFormLink href={ROUTER.login}>Sign in instead?</AuthFormLink>
                                        </Link>
                                        <BtnFunc label="Sign Up" />
                                        <LoginSocial />
                                </AuthFormWrapper>
                        </AuthFormContainer>
                </>
        );
};

const RegisterRouter = (props: any) => <RouterHOC Component={Register} props={props} />;
export default RegisterRouter;
