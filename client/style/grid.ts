import styled, { css } from "styled-components";
import { Property } from "csstype";

export const Grid = {
        Row: styled.div<{
                $alignItems?: Property.AlignItems;
                $justifyContent?: Property.JustifyContent;
        }>(
                ({ $alignItems = "normal", $justifyContent = "normal" }) => css`
                        display: grid;
                        grid-template-columns: repeat(12, 1fr);
                        width: 100%;
                        justify-content: ${$justifyContent};
                        align-items: ${$alignItems};
                        height: auto;
                `
        ),
        Col: styled.div<{ $span: number; $startPoint?: number }>(
                ({ $span, $startPoint = "auto" }) => css`
                        grid-column: ${` ${$startPoint} / span ${$span} `};
                        height: inherit;
                `
        ),
};

export const Layout = styled.div<{
        $alignItems?: Property.AlignItems;
        $justifyContent?: Property.JustifyContent;
        $flexDirection?: Property.FlexDirection;
}>(
        ({ $flexDirection = "initial", $alignItems = "normal", $justifyContent = "normal" }) => css`
                display: flex;
                width: 100%;
                height: 100%;
                flex-direction: ${$flexDirection};
                align-items: ${$alignItems};
                justify-content: ${$justifyContent};
        `
);
