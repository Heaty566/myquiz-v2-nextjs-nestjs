import * as React from 'react';
import dynamic from 'next/dynamic';

//* Import
import { seoHead } from '../helper/seoHead';
import { HomeBottomProps } from '../components/views/index/bottom';
import { CircleLoading } from '../components/common/loading';
import { FooterProps } from '../components/footer';
import { useComponent } from '../hooks/useComponent';
import HomeTop from '../components/views/index/top';

const HomeCenter = dynamic(() => import('../components/views/index/center'), { loading: () => <CircleLoading marginTop={8} /> });
export interface IndexProps {}

export const HomePage: React.FunctionComponent<IndexProps> = () => {
        const [HomeBottom, check2] = useComponent<HomeBottomProps>({
                RefComponent: dynamic(() => import('../components/views/index/bottom'), { loading: () => <CircleLoading marginTop={8} /> }),
                offset: 500,
                delay: 2000,
                Loading: () => <CircleLoading marginTop={8} />,
        });
        const [Footer] = useComponent<FooterProps>({
                RefComponent: dynamic(() => import('../components/footer'), { loading: () => <CircleLoading marginTop={8} /> }),
                offset: 300,
                Loading: () => <CircleLoading marginTop={8} />,
                isRender: check2,
                delay: 2000,
        });

        return (
                <>
                        {seoHead({ title: 'Home', isFollowPage: true, isIndexPage: true })}
                        <HomeTop />
                        <HomeCenter />
                        <HomeBottom />
                        <Footer />
                </>
        );
};

export default HomePage;
