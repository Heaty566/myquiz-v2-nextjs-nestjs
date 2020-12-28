import styled, { css } from 'styled-components';
import { Property } from 'csstype';

export const ImageFull = styled.img<{ $objectFit?: Property.ObjectFit }>(
        ({ $objectFit = 'cover' }) => css`
                height: 100%;
                min-height: inherit;
                min-width: inherit;
                width: 100%;
                object-fit: ${$objectFit};
        `,
);
