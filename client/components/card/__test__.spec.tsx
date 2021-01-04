import * as Enzyme from 'enzyme';
import { QuizCard, QuizCardProps, UserPlanCard, UserPlanCardProps } from '.';

describe('<QuizCard />', () => {
        const renderFunction = () => {
                return Enzyme.shallow<QuizCardProps>(<QuizCard owner="nhan" stars={100} title="myquiz" totalQuestion={20} />);
        };

        //simple test
        it('should render', () => {
                const component = renderFunction();

                expect(component).toHaveLength(1);
        });
});

describe('<UserPlanCard />', () => {
        const renderFunction = () => {
                return Enzyme.shallow<UserPlanCardProps>(
                        <UserPlanCard
                                btnText="test1"
                                color="one"
                                featureLabel="test2"
                                link="/user/login"
                                listFeatures={['test3', 'test4']}
                                price={10}
                                title="test5"
                        />,
                );
        };

        //simple test
        it('should render', () => {
                const component = renderFunction();

                expect(component).toHaveLength(1);
        });
});
