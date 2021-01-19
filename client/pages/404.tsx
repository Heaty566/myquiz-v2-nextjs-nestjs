import * as React from 'react';

//* Import
import { NotFoundContainer, NotFoundWrapper, NotFoundTitle, NotFoundText } from '../components/views/404/style';

import Footer from '../components/footer';
import { seoHead } from '../helper/seoHead';
import { ROUTER } from '../constant/routerConstant';
import { BtnLink } from '../components/btnLink';

export interface NotFoundProps {}
const NotFound: React.FunctionComponent<NotFoundProps> = () => {
        return (
                <>
                        {seoHead({ title: 'Not Found' })}
                        <NotFoundContainer>
                                <NotFoundWrapper>
                                        <NotFoundTitle>
                                                404
                                                <br />
                                                Whoops!
                                        </NotFoundTitle>
                                        <NotFoundText>We couldn’t connect you to page you are looking for.</NotFoundText>
                                        <BtnLink label="Go back to home" url={ROUTER.home} />
                                </NotFoundWrapper>
                        </NotFoundContainer>
                        <Footer />
                </>
        );
};

export default NotFound;
