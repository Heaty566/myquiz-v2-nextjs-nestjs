import * as React from 'react';
import dynamic from 'next/dynamic';

//*Import style
import { HeadMeta } from '../components/head';
import { HomeBottomProps } from '../style/views/index/homeBottom';
//*Import Component
import { CircleLoading } from '../components/common/loading';
import { FooterProps } from '../components/footer';
import { useComponent } from '../hooks/useComponent';
import HomeTop from '../style/views/index/homeTop';

export interface IndexProps {}
const HomeCenter = dynamic(() => import('../style/views/index/homeCenter'), { loading: () => <CircleLoading marginTop={8} /> });

export const HomePage: React.FunctionComponent<IndexProps> = () => {
        const [HomeBottom, check2] = useComponent<HomeBottomProps>({
                RefComponent: dynamic(() => import('../style/views/index/homeBottom'), { loading: () => <CircleLoading marginTop={8} /> }),
                offset: 500,

                Loading: () => <CircleLoading marginTop={8} />,
        });
        const [Footer] = useComponent<FooterProps>({
                RefComponent: dynamic(() => import('../components/footer'), { loading: () => <CircleLoading marginTop={8} /> }),
                offset: 300,
                Loading: () => <CircleLoading marginTop={8} />,
                isRender: check2,
        });

        return (
                <>
                        <HeadMeta pageTitle="Home" isFollowPage={true} isIndexPage={true} />
                        <HomeTop />
                        <HomeCenter />
                        <HomeBottom />
                        <Footer />
                </>
        );
};

export default HomePage;
