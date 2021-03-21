//* Import
import { AuthFormContainer } from '../../../components/views/user/form';

// import { ForgotPasswordDto } from '../../../service/auth/dto';

import { RouterHOC } from '../../../HOC/routerHOC';

// import { authActions } from '../../../store/auth';
import { seoHead } from '../../../helper/seoHead';

export interface LoginProps {}

// const initialValue: ForgotPasswordDto = {
//         email: '',
// };

const ForgotPassword: React.FunctionComponent<LoginProps> = () => {
        // const apiState = useSelector<RootState, ApiState>((state) => state.api);

        // const { register, handleSubmit } = useForm<ForgotPasswordDto>({
        //         defaultValues: initialValue,
        // });
        // const [errors, setErrors] = useState<ForgotPasswordDto>(initialValue);

        // const handleOnSubmit = (data: ForgotPasswordDto) => {
        //         store.dispatch(authActions.forgotPasswordCreate(data));
        // };

        // useEffect(() => {
        //         const { isError, errorDetails } = apiState;

        //         if (isError) setErrors({ ...initialValue, ...errorDetails });
        //         else setErrors(initialValue);
        // }, [apiState.isError]);

        return (
                <>
                        {seoHead({ title: 'Forgot Password', canonical: '/user/forgot-password', keyword: 'reset password, recovery password' })}
                        <AuthFormContainer>
                                {/* <AuthFormWrapper onSubmit={handleSubmit(handleOnSubmit)} role="form">
                                        <AuthFormTitle>
                                                <span>Forgot Password</span>
                                        </AuthFormTitle>

                                        <p>Enter your email address and we’ll send you a recovery link.</p>
                                        {apiState.message && <AuthFormSuccessMsg>{apiState.message}</AuthFormSuccessMsg>}
                                        <InputText errorMessage={errors.email} label="Email" name="email" register={register} />

                                        <BtnFunc label="Send An Email" isLoading={apiState.isLoading} />
                                </AuthFormWrapper> */}
                        </AuthFormContainer>
                </>
        );
};

const ForgotPasswordRouter = (props: any) => <RouterHOC Component={ForgotPassword} props={props} />;
export default ForgotPasswordRouter;
