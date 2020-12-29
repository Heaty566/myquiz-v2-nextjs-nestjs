import styled, { css } from "styled-components";
import { Property } from "csstype";

export type TypographyType = "h1" | "h2" | "h3" | "h4" | "h5" | "p1" | "p2" | "p3";

interface Typography {
        $textAlign?: Property.TextAlign;
        $color?: "black" | "white";
        $type: TypographyType;
}

export const Text = styled.h1<Typography>(
        ({ theme: { fontSize, colors }, $textAlign, $color = "black", $type }) => css`
                font-size: ${fontSize[$type]}px;
                color: ${colors.font[$color]};
                text-align: ${$textAlign};
        `
);
