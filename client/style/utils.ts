import styled, { css } from "styled-components";
import { Property } from "csstype";

export const Box = styled.div<{ $height?: Property.Height; $width?: Property.Width }>(
        ({ $height = "100%", $width = "100%" }) => css`
                height: ${$height};
                width: ${$width};
        `
);
