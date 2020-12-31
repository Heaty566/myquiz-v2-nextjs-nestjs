/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';

import { ThemeProvider } from 'styled-components';
import { Navbar } from '../components/navbar';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';

//* Style import
import { GlobalStyle, variable } from '../style';
import '../i18n';

export interface AppProps {
        Component: React.FunctionComponent;
        pageProps: any;
}

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
        const { i18n } = useTranslation();

        useEffect(() => {
                const cookies = new Cookies();
                const lang = cookies.get('lang');
                i18n.changeLanguage(lang);
        }, []);

        return (
                <>
                        <ThemeProvider theme={variable}>
                                <GlobalStyle />

                                <header>
                                        <Navbar />
                                </header>
                                <Component {...pageProps} />
                        </ThemeProvider>
                </>
        );
};

export default App;
