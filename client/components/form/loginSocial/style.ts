import style, { css } from 'styled-components';

export const SocialContainer = style.div(() => css``);

export const SocialLink = style.button<{ $color: string; $background: string }>(
        ({ theme: { ruler, boxShadow, borderRadius }, $background, $color }) => css`
                display: flex;
                align-items: center;
                cursor: pointer;
                width: 100%;
                padding: ${ruler}px ${ruler * 2}px;
                box-shadow: ${boxShadow.one};
                font-weight: bold;
                color: ${$color};
                border-radius: ${borderRadius.sm}px;
                background-color: ${$background};
                &:hover {
                        filter: brightness(0.95);
                }
                &:not(:last-child) {
                        margin-bottom: ${ruler}px;
                }
        `,
);

export const SocialImage = style.div(
        ({ theme: { ruler } }) => css`
                display: grid;
                place-items: center;
                margin-right: ${ruler * 2}px;
        `,
);
