import * as React from "react";

import { GlobalStyle } from "../styled";
import Navbar from "../components/navbar";

export interface AppProps {
        Component: React.FunctionComponent;
        pageProps: any;
}

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
        return (
                <React.Fragment>
                        <GlobalStyle />
                        <header>
                                <Navbar />
                        </header>
                        <Component {...pageProps} />
                </React.Fragment>
        );
};

export default App;
