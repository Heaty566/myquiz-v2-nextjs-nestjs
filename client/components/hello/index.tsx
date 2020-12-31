import * as React from 'react';

export interface TesttProps {
        hello: string;
}

const Testt: React.FunctionComponent<TesttProps> = ({ hello }) => {
        console.log(hello);
        return <h1>tet</h1>;
};

export default Testt;
