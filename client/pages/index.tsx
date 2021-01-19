import * as React from 'react';
import dynamic from 'next/dynamic';

//* Import
import { CircleLoading } from '../components/common/loading';
import HomeTop from '../components/views/home/top';
import { HomeBottomProps } from '../components/views/home/bottom';
import { seoHead } from '../helper/seoHead';
import { FooterProps } from '../components/footer';
import { useComponent } from '../hooks/useComponent';
const HomeCenter = dynamic(() => import('../components/views/home/center'), { loading: () => <CircleLoading marginTop={8} /> });

export interface IndexProps {}
export const HomePage: React.FunctionComponent<IndexProps> = () => {
        const [HomeBottom, check2] = useComponent<HomeBottomProps>({
                RefComponent: dynamic(() => import('../components/views/home/bottom'), { loading: () => <CircleLoading marginTop={8} /> }),
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
                        {seoHead({ title: 'Home', isIndexPage: true, isFollowPage: true })}
                        <main>
                                <HomeTop />
                                <HomeCenter />
                                <HomeBottom />
                                <Footer />
                        </main>
                </>
        );
};

export default HomePage;
