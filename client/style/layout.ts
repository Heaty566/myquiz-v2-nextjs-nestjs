import styled, { css } from 'styled-components';
import { Property } from 'csstype';

export const Grid = {
        Row: styled.div<{
                $alignItems?: Property.AlignItems;
                $justifyContent?: Property.JustifyContent;
        }>(
                ({ $alignItems = 'normal', $justifyContent = 'normal' }) => css`
                        display: grid;
                        grid-template-columns: repeat(12, 1fr);
                        width: 100%;
                        justify-content: ${$justifyContent};
                        align-items: ${$alignItems};
                        height: auto;
                `,
        ),
        Col: styled.div<{ $span: number; $startPoint?: number }>(
                ({ $span, $startPoint = 'auto' }) => css`
                        grid-column: ${` ${$startPoint} / span ${$span} `};
                        height: inherit;
                `,
        ),
};

export const Layout = styled.div<{
        $alignItems?: Property.AlignItems;
        $justifyContent?: Property.JustifyContent;
        $flexDirection?: Property.FlexDirection;
        $gutter?: number;
        $max?: boolean;
}>(
        ({ $flexDirection = 'initial', $alignItems = 'normal', $justifyContent = 'normal', $gutter = 0, theme: { ruler }, $max = false }) => css`
                display: flex;
                flex-direction: ${$flexDirection};
                align-items: ${$alignItems};
                justify-content: ${$justifyContent};
                ${$max &&
                css`
                        height: 100%;
                        width: 100%;
                `}

                & > *:not(:last-child) {
                        margin-right: ${ruler * $gutter}px;
                }
        `,
);
