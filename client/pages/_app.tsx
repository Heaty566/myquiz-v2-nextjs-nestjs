/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import { Provider } from 'react-redux';
import '../i18n';

//* Import
import { store } from '../store';
import { GlobalStyle, variable } from '../style';
import { apiActions } from '../store/api';
import { Navbar } from '../components/navbar';
import { userApiCall } from '../api/user/action';
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
                if (reToken) store.dispatch(userApiCall.getUser());
        }, [reToken]);

        return (
                <Provider store={store}>
                        <ThemeProvider theme={variable}>
                                <GlobalStyle />
                                <Navbar />

                                <Component {...pageProps} />
                        </ThemeProvider>
                </Provider>
        );
};

export default App;
