import { createGlobalStyle, DefaultTheme, css } from 'styled-components';
import { rotateAnimation, fadeInAnimation } from './animation';

export const breakPoint = {
        xs: `only screen and (max-width: 480px)`,
        sm: `only screen and (max-width: 576px)`,
        md: `only screen and (max-width: 768px)`,
        lg: `only screen and (max-width: 992px)`,
        xl: `only screen and (max-width: 1200px)`,
        xll: `only screen and (max-width: 1600px)`,
};

export const variable: DefaultTheme = {
        colors: {
                primary: {
                        one: '#5375E2',
                        two: '#7591E8',
                        three: '#98ACEE',
                        four: '#BAC8F3',
                        five: '#234dd3',
                },
                secondary: {
                        one: '#7791A1',
                        two: '#92A7B4',
                        three: '#ADBDC7',
                        four: '#C9D3D9',
                },
                red: {
                        one: '#F65868',
                        two: '#F87986',
                        three: '#F87986',
                },
                grey: {
                        one: '#5C616E',
                        two: '#7D818B',
                        three: '#9DA0A8',
                },
                orange: {
                        one: '#F3AA92',
                        two: '#F5BBA8',
                        three: '#F8CCBE',
                },
                white: {
                        one: '#fefefe',
                        two: '#f5f7fa',
                },
                dark: {
                        one: '#171717',
                },
                font: {
                        black: '#171717',
                        white: '#fefefe',
                },
        },
        stroke: {
                one: ` 1px solid rgba(23, 23, 23, 0.8)`,
        },
        background: {
                one: 'linear-gradient(97.8deg, #5375e2 0.25%, #5375e2 49.61%, #f87986 100%)',
        },
        fontSize: {
                h1: 40,
                h2: 32,
                h3: 24,
                h4: 16,
                h5: 13,
                p1: 16,
                p2: 14,
                p3: 13,
        },
        ruler: 8,
        animation: {
                rotate: rotateAnimation,
                fadeIn: fadeInAnimation,
        },
};

export const GlobalStyle = createGlobalStyle(
        () => css`
                *,
                *::before,
                *::after {
                        padding: 0;
                        margin: 0;
                        box-sizing: border-box;
                }

                html {
                        font-size: 16px;
                        font-family: Arial, Helvetica, sans-serif;
                }

                a {
                        cursor: pointer;
                }

                a,
                li {
                        text-decoration: none;
                }

                ul {
                        list-style: none;
                }

                button,
                input {
                        border: none;
                        outline: none;
                        background-color: transparent;
                }

                body {
                        min-height: 100vh;
                        width: 100%;
                        position: relative;
                }

                #__next {
                        min-height: inherit;
                        display: flex;
                        flex-direction: column;
                        & > *:nth-child(2) {
                                flex: 1;
                                padding-top: 64px;
                        }
                }
        `,
);
