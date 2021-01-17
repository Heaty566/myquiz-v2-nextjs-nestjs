import style, { css } from 'styled-components';

export const SocialContainer = style.div(() => css``);

export const SocialLink = style.a<{ $color: string; $background: string }>(
        ({ theme: { ruler, boxShadow, borderRadius }, $background, $color }) => css`
                display: flex;
                align-items: center;
                padding: ${ruler}px ${ruler * 2}px;
                box-shadow: ${boxShadow.one};
                font-weight: bold;
                color: ${$color};
                border-radius: ${borderRadius.sm}px;
                background-color: ${$background};

                &:not(:last-child) {
                        margin-bottom: ${ruler}px;
                }
        `,
);

export const SocialImage = style.div(
        ({ theme: { ruler } }) => css`
                margin-right: ${ruler * 2}px;
        `,
);
