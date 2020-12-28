import React from 'react';
import dynamic from 'next/dynamic';
import { HeadMeta } from '../components/head';

import { CircleLoading } from '../components/loading';

import HomeTop from '../components/homePage/homeTop';
const HomeCenter = dynamic(() => import('../components/homePage/homeCenter'), { loading: () => <CircleLoading marginTop={4} /> });

export interface IndexProps {}

export const HomePage: React.FunctionComponent<IndexProps> = () => {
        return (
                <>
                        <HeadMeta pageTitle="Home" description="GEGE" isFollowPage={true} isIndexPage={true} />
                        <HomeTop />
                        <HomeCenter />
                </>
        );
};

export default HomePage;
