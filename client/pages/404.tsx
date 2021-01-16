import * as React from 'react';

//* Import
import { NotFoundContainer, NotFoundWrapper } from '../components/views/404/style';
import { Text } from '../style/typography';
import { seoHead } from '../helper/seoHead';
import { ROUTER } from '../constant/routerConstant';
import { BtnLink } from '../components/button';
import Footer from '../components/footer';

export interface NotFoundProps {}
const NotFound: React.FunctionComponent<NotFoundProps> = () => {
        return (
                <>
                        {seoHead({ title: 'Not Found' })}
                        <NotFoundContainer $justifyContent="center" $alignItems="center">
                                <NotFoundWrapper>
                                        <h1>
                                                404
                                                <br />
                                                Whoops!
                                        </h1>
                                        <Text $type="h4" as="h4">
                                                We couldn’t connect you to page you are looking for.
                                        </Text>
                                        <BtnLink label="Go back to home" link={ROUTER.home} />
                                </NotFoundWrapper>
                        </NotFoundContainer>
                        <Footer />
                </>
        );
};

export default NotFound;
