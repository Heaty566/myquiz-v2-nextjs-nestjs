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
                white: {
                        one: '#fefefe',
                        two: '#f5f7fa',
                },
                dark: {
                        one: '#171717',
                },
                green: {
                        one: '#27ae60',
                },
                font: {
                        black: '#171717',
                        white: '#ffffff',
                },
        },
        stroke: {
                one: ` 1px solid rgba(23, 23, 23, 0.8)`,
        },
        background: {
                one: 'linear-gradient(97.8deg, #5375e2 0.25%, #5375e2 49.61%, #f87986 100%)',
        },
        fontSize: {
                40: 40,
                32: 32,
                24: 24,
                16: 16,
                14: 14,
        },
        borderRadius: {
                sm: 2,
        },
        ruler: 8,

        boxShadow: {
                one: '0px 1px 2px rgba(0, 0, 0, 0.25)',
        },
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

                /* roboto-regular - vietnamese_latin */
                @font-face {
                        font-family: 'Roboto';
                        font-style: normal;
                        font-weight: 400;
                        src: url('/asset/fonts/roboto-v20-vietnamese_latin-regular.eot'); /* IE9 Compat Modes */
                        src: local(''), url('/asset/fonts/roboto-v20-vietnamese_latin-regular.eot?#iefix') format('embedded-opentype'),
                                /* IE6-IE8 */ url('/asset/fonts/roboto-v20-vietnamese_latin-regular.woff2') format('woff2'),
                                /* Super Modern Browsers */ url('/asset/fonts/roboto-v20-vietnamese_latin-regular.woff') format('woff'),
                                /* Modern Browsers */ url('/asset/fonts/roboto-v20-vietnamese_latin-regular.ttf') format('truetype'),
                                /* Safari, Android, iOS */ url('/asset/fonts/roboto-v20-vietnamese_latin-regular.svg#Roboto') format('svg'); /* Legacy iOS */
                }
                /* roboto-500 - vietnamese_latin */
                @font-face {
                        font-family: 'Roboto';
                        font-style: normal;
                        font-weight: 500;
                        src: url('/asset/fonts/roboto-v20-vietnamese_latin-500.eot'); /* IE9 Compat Modes */
                        src: local(''), url('/asset/fonts/roboto-v20-vietnamese_latin-500.eot?#iefix') format('embedded-opentype'),
                                /* IE6-IE8 */ url('/asset/fonts/roboto-v20-vietnamese_latin-500.woff2') format('woff2'),
                                /* Super Modern Browsers */ url('/asset/fonts/roboto-v20-vietnamese_latin-500.woff') format('woff'),
                                /* Modern Browsers */ url('/asset/fonts/roboto-v20-vietnamese_latin-500.ttf') format('truetype'),
                                /* Safari, Android, iOS */ url('/asset/fonts/roboto-v20-vietnamese_latin-500.svg#Roboto') format('svg'); /* Legacy iOS */
                }
                /* roboto-700 - vietnamese_latin */
                @font-face {
                        font-family: 'Roboto';
                        font-style: normal;
                        font-weight: 700;
                        src: url('/asset/fonts/roboto-v20-vietnamese_latin-700.eot'); /* IE9 Compat Modes */
                        src: local(''), url('/asset/fonts/roboto-v20-vietnamese_latin-700.eot?#iefix') format('embedded-opentype'),
                                /* IE6-IE8 */ url('/asset/fonts/roboto-v20-vietnamese_latin-700.woff2') format('woff2'),
                                /* Super Modern Browsers */ url('/asset/fonts/roboto-v20-vietnamese_latin-700.woff') format('woff'),
                                /* Modern Browsers */ url('/asset/fonts/roboto-v20-vietnamese_latin-700.ttf') format('truetype'),
                                /* Safari, Android, iOS */ url('/asset/fonts/roboto-v20-vietnamese_latin-700.svg#Roboto') format('svg'); /* Legacy iOS */
                }

                html {
                        font-size: 16px;
                        font-family: 'Roboto', sans-serif;
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
                                height: 100%;
                        }
                }
        `,
);
