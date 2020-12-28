import * as React from 'react';
import Head from 'next/head';

export interface HeadProps {
        pageTitle: string;
        description: string;
        isIndexPage?: boolean;
        isFollowPage?: boolean;
        canonical?: string;
        keyword?: string;
        imageUrl?: string;
}

export const HeadMeta: React.FunctionComponent<HeadProps> = ({
        pageTitle = '',
        isIndexPage = false,
        isFollowPage = true,
        description = '',
        canonical = '/',
        keyword = 'myquiz, quiz, exam, study, learning',
        imageUrl = '/',
}) => {
        const metaIndexPage = isIndexPage ? 'index' : 'noindex';
        const metaIsFollowPage = isFollowPage ? 'follow' : 'nofollow';
        const metaRobots = `${metaIndexPage},${metaIsFollowPage}`;
        const canonicalLink = process.env.DOMAIN + canonical;

        return (
                <Head>
                        <meta charSet="UTF-8" />
                        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0" />
                        {/* common header */}
                        <title>{pageTitle} | MyQuiz</title>
                        <meta name="description" content={description} />
                        <meta name="robots" content={metaRobots} />
                        <meta name="keywords" content={keyword} />
                        <link href={canonicalLink} rel="canonical" />
                        {/* google header */}
                        <meta property="og:type" content="article" />
                        <meta property="og:title" content={pageTitle} />
                        <meta property="og:description" content={description} />
                        <meta property="og:image" content={imageUrl} />
                        <meta name="fb:app_id" content="1289736761385432" />
                        {/* twitter header */}
                        <meta name="twitter:title" content={pageTitle} />
                        <meta name="twitter:description" content={description} />
                        <meta name="twitter:image" content={imageUrl} />
                        <meta name="twitter:card" content="summary_large_image" />
                </Head>
        );
};
