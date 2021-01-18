import * as React from 'react';
import { HomeTop } from '../components/views/home/top';
import { HomeCenter } from '../components/views/home/center';
import { seoHead } from '../helper/seoHead';

//* Import
export interface IndexProps {}

export const HomePage: React.FunctionComponent<IndexProps> = () => {
        return (
                <>
                        {seoHead({ title: 'Home', isIndexPage: true, isFollowPage: true })}
                        <main>
                                <HomeTop />
                                <HomeCenter />
                        </main>
                </>
        );
};

export default HomePage;
