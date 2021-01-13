/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
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
import { store, RootState } from '../store';
import { ApiState, apiActions } from '../store/api';
import { AuthState, authActions } from '../store/auth';
export interface AppProps {
        Component: React.FunctionComponent;
        pageProps: any;
}

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
        const { i18n } = useTranslation();
        const cookies = new Cookies();

        useEffect(() => {
                const lang = cookies.get('lang');
                i18n.changeLanguage(lang);
        }, []);

        useEffect(() => {
                store.dispatch(apiActions.resetState());
        }, [Component]);

        useEffect(() => {
                const reToken = cookies.get('re-token');

                if (reToken) store.dispatch(authActions.getUser());
        });

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
