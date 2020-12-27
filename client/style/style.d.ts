import "styled-components";

export interface Theme {
        colors: {
                primary: {
                        one: string;
                        two: string;
                        three: string;
                        four: string;
                        five: string;
                };
                secondary: {
                        one: string;
                        two: string;
                        three: string;
                        four: string;
                };
                red: {
                        one: string;
                        two: string;
                        three: string;
                };
                grey: {
                        one: string;
                        two: string;
                        three: string;
                };
                orange: {
                        one: string;
                        two: string;
                        three: string;
                };
                white: {
                        one: string;
                };
                font: {
                        black: string;
                        white: string;
                };
        };
        background: {
                one: string;
        };
        fontSize: {
                h1: number;
                h2: number;
                h3: number;
                h4: number;
                h5: number;
                p1: number;
                p2: number;
                p3: number;
        };
        ruler: number;
}
declare module "styled-components" {
        export interface DefaultTheme extends Theme {}
}
