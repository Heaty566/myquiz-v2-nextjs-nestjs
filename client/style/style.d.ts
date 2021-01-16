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
                orange: {
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
        animation: {
                rotate: Keyframes;
                fadeIn: Keyframes;
        };
}
declare module 'styled-components' {
        export interface DefaultTheme extends Theme {}
}
