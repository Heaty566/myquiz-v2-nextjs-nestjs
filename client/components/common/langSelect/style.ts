import styled, { css } from 'styled-components';

//* Import
import { Layout } from '../../../style/layout';

export const LangContainer = styled(Layout)(
        ({ theme: { colors, ruler } }) => css`
                background-color: ${colors.white.one};
                padding: ${ruler}px ${ruler * 2}px;
                max-width: 176px;
                width: 100%;
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
                border-radius: 3px;
                position: relative;
                cursor: pointer;
                &.active ${LangOption} {
                        display: block;
                }
        `,
);

export const LangSel = styled.input(
        ({ theme: { ruler } }) => css`
                width: 100%;
                margin: 0 ${ruler}px;
                cursor: pointer;
                & > * {
                        position: absolute;
                        left: 0;
                }
        `,
);

export const LangOption = styled.ul(
        ({ theme: { colors, ruler } }) => css`
                display: none;
                position: absolute;
                background-color: ${colors.white.one};
                width: 100%;
                left: 0;
                top: calc(100%);

                & > * {
                        padding: ${ruler}px;
                        transition: 0.2s;
                }

                & > *:hover {
                        color: ${colors.white.one};
                        background-color: ${colors.primary.three};
                }
        `,
);
