import { createGlobalStyle } from "styled-components";
// import pala from "../public/font/SF-Pro-Display-Regular.otf";
export const variable = {
        colors: {
                primary: {
                        one: "#5375E2",
                        two: "#7591E8",
                        three: "#98ACEE",
                        four: "#BAC8F3",
                },
                secondary: {
                        one: "#7791A1",
                        two: "#92A7B4",
                        three: "#ADBDC7",
                        four: "#C9D3D9",
                },
                red: {
                        one: "#F65868",
                        two: "#F87986",
                        three: "#F87986",
                },
                grey: {
                        one: "#5C616E",
                        two: "#7D818B",
                        three: "#9DA0A8",
                },
                orange: {
                        one: "#F3AA92",
                        two: "#F5BBA8",
                        three: "#F8CCBE",
                },
                white: {
                        one: "#fefefe",
                },
                font: {
                        black: "#171717",
                        white: "#fefefe",
                },
        },
        fontSize: {
                headingOne: 40,
                headingTwo: 32,
                headingThree: 24,
                headingFour: 16,
                headingFive: 13,
                bodyOne: 16,
                bodyTwo: 14,
        },
        ruler: 8,
};

export const GlobalStyle = createGlobalStyle`

   @font-face {
    font-family: "SFPro";
    src: url("/font/SF-Pro-Display-Regular.otf"),
    url("/font/SF-Pro-Display-Bold.otf"),
    url("/font/SF-Pro-Display-Light.otf"),
    url("/font/SF-Pro-Display-Medium.otf"),
    url("/font/SF-Pro-Display-Semibold.otf");
    font-weight: normal;
    font-style: normal;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    font-family: 'SFPro';
  }

  a,li {
        text-decoration: none;
  }

  button, input {
        border: none;
        outline: none;
        background-color: transparent;
  }

  body {
    min-height: 100vh;
    width: 100%;
    position: relative;
  }

`;
