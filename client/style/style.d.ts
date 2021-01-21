import { Keyframes } from 'styled-components';

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
                white: {
                        one: string;
                        two: string;
                };
                dark: {
                        one: string;
                };
                green: {
                        one: string;
                };
                font: {
                        black: string;
                        white: string;
                };
        };
        stroke: {
                one: string;
        };
        background: {
                one: string;
        };
        fontSize: {
                40: number;
                32: number;
                24: number;
                16: number;
                14: number;
        };
        borderRadius: {
                sm: number;
        };
        boxShadow: {
                one: string;
        };
        ruler: number;
        animation: {
                rotate: Keyframes;
                fadeIn: Keyframes;
        };
}
declare module 'styled-components' {
        export interface DefaultTheme extends Theme {}
}
