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

export const Box = styled.div<{ $height?: Property.Height; $width?: Property.Width }>(
        ({ $height = '100%', $width = '100%' }) => css`
                height: ${$height};
                width: ${$width};
        `,
);
