/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import { Provider } from 'react-redux';
import '../i18n';

//* Style import
import { GlobalStyle, variable } from '../style';

//* Components import
import { Navbar } from '../components/navbar';

//* Redux import
import { store } from '../store';

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
                        <Provider store={store}>
                                <ThemeProvider theme={variable}>
                                        <GlobalStyle />

                                        <header>
                                                <Navbar />
                                        </header>
                                        <Component {...pageProps} />
                                </ThemeProvider>
                        </Provider>
                </>
        );
};

export default App;
