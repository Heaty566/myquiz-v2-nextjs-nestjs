import styled, { css } from "styled-components";
import { Property } from "csstype";

export const ImageFull = styled.img<{ $objectFit?: Property.ObjectFit }>(
        ({ $objectFit = "cover" }) => css`
                height: 100%;
                width: 100%;
                object-fit: ${$objectFit};
        `
);
