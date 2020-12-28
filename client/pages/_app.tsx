import React from 'react';

import { ThemeProvider } from 'styled-components';
import { Navbar } from '../components/navbar';

//* Style import
import { GlobalStyle } from '../style';
import { variable } from '../style/index';
export interface AppProps {
        Component: React.FunctionComponent;
        pageProps: any;
}

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
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
