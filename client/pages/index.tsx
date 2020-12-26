import * as React from "react";
import PageHead from "../components/head";

export interface IndexProps {}

const Index: React.FunctionComponent<IndexProps> = () => {
        return (
                <React.Fragment>
                        <PageHead pageTitle="hello" description="GEGE" />
                        <div>
                                <img src="/icon/nav-logo.svg" />
                                <h1 className="gello">dsa</h1>
                        </div>
                </React.Fragment>
        );
};

export default Index;
