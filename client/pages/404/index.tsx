import * as React from 'react';

import { BtnLink } from '../../components/button';
import { NotFoundContainer, NotFoundWrapper } from '../../style/views/style';
import { Text } from '../../style/typography';
import Footer from '../../components/footer';

export interface NotFoundProps {}

const NotFound: React.FunctionComponent<NotFoundProps> = () => {
        return (
                <>
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
                                        <BtnLink label="Go back to home" link="/" />
                                </NotFoundWrapper>
                        </NotFoundContainer>
                        <Footer />
                </>
        );
};

export default NotFound;
