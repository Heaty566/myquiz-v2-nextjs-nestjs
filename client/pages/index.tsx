import * as React from 'react';
import dynamic from 'next/dynamic';
import { HeadMeta } from '../components/head';

import { CircleLoading } from '../components/common/loading';

import HomeTop from '../components/homePage/homeTop';
const HomeCenter = dynamic(() => import('../components/homePage/homeCenter'), { loading: () => <CircleLoading marginTop={4} /> });
const HomeBottom = dynamic(() => import('../components/homePage/homeBottom'), { loading: () => <CircleLoading marginTop={4} /> });
const Footer = dynamic(() => import('../components/footer'), { loading: () => <CircleLoading marginTop={4} /> });
import { useComponent } from '../hooks/useComponent';

import { FooterProps } from '../components/footer';
import { HomeBottomProps } from '../components/homePage/homeBottom';

export interface IndexProps {}

export const HomePage: React.FunctionComponent<IndexProps> = () => {
        const [NewBottom, check2] = useComponent<HomeBottomProps>({
                RefComponent: HomeBottom,
                offset: 100,

                Loading: () => <CircleLoading marginTop={8} />,
        });
        const [NewFooter] = useComponent<FooterProps>({
                RefComponent: Footer,
                offset: 100,
                Loading: () => <CircleLoading marginTop={8} />,
                isRender: check2,
        });
        return (
                <>
                        <HeadMeta pageTitle="Home" description="GEGE" isFollowPage={true} isIndexPage={true} />
                        <HomeTop />
                        <HomeCenter />
                        <NewBottom />
                        <NewFooter />
                </>
        );
};

export default HomePage;
