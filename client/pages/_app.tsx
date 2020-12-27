import * as React from "react";

import { GlobalStyle } from "../style";
import Navbar from "../components/navbar";
import { variable } from "../style/index";
import { ThemeProvider } from "styled-components";
export interface AppProps {
        Component: React.FunctionComponent;
        pageProps: any;
}

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
        return (
                <React.Fragment>
                        <ThemeProvider theme={variable}>
                                <GlobalStyle />
                                <header>
                                        <Navbar />
                                </header>
                                <Component {...pageProps} />
                        </ThemeProvider>
                </React.Fragment>
        );
};

export default App;
