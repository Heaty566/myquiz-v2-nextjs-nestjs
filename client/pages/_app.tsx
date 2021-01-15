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
import { apiActions } from '../store/api';
import { authActions } from '../store/auth';
export interface AppProps {
        Component: React.FunctionComponent;
        pageProps: any;
}

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
        const { i18n } = useTranslation();
        const cookies = new Cookies();
        const reToken = cookies.get('re-token');

        useEffect(() => {
                const lang = cookies.get('lang');
                i18n.changeLanguage(lang);
        }, []);

        useEffect(() => {
                store.dispatch(apiActions.resetState());
        }, [Component]);

        useEffect(() => {
                if (reToken) store.dispatch(authActions.getUser());
        }, [reToken]);

        return (
                <Provider store={store}>
                        <ThemeProvider theme={variable}>
                                <GlobalStyle />
                                <header>
                                        <Navbar />
                                </header>
                                <Component {...pageProps} />
                        </ThemeProvider>
                </Provider>
        );
};

export default App;
