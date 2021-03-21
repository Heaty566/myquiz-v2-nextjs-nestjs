//* Import
import { AuthFormContainer } from '../../../components/views/user/form';

// import { ForgotPasswordUpdateDto } from '../../../service/auth/dto';

import { RouterHOC } from '../../../HOC/routerHOC';
import { seoHead } from '../../../helper/seoHead';
// import { authActions } from '../../../store/auth';

export interface LoginProps {}

// const initialValue: ForgotPasswordUpdateDto = {
//         confirmPassword: '',
//         newPassword: '',
//         resetKey: '',
// };

const ForgotPasswordUpdate: React.FunctionComponent<LoginProps> = () => {
        // const apiState = useSelector<RootState, ApiState>((state) => state.api);
        // const router = useRouter();
        // const { register, handleSubmit } = useForm<ForgotPasswordUpdateDto>({
        //         defaultValues: initialValue,
        // });
        // const [errors, setErrors] = useState<ForgotPasswordUpdateDto>(initialValue);

        // const handleOnSubmit = (data: ForgotPasswordUpdateDto) => {
        //         const { key = '' } = router.query;
        //         if (typeof key === 'string') {
        //                 store.dispatch(authActions.forgotPasswordUpdate({ ...data, resetKey: key }));
        //         }
        // };

        // useEffect(() => {
        //         const { isError, errorDetails, message } = apiState;

        //         if (isError) setErrors({ ...initialValue, ...errorDetails });
        //         else setErrors(initialValue);

        //         if (message) setTimeout(() => router.push(ROUTER.login), 2000);
        // }, [apiState.isError, apiState.message]);

        return (
                <>
                        {seoHead({ title: 'Reset Password', canonical: '/user/forgot-password', keyword: 'reset password, recovery password' })}
                        <AuthFormContainer>
                                {/* <AuthFormWrapper onSubmit={handleSubmit(handleOnSubmit)} role="form">
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
                                </AuthFormWrapper> */}
                        </AuthFormContainer>
                </>
        );
};

const ForgotPasswordUpdateRouter = (props: any) => <RouterHOC Component={ForgotPasswordUpdate} props={props} />;
export default ForgotPasswordUpdateRouter;
