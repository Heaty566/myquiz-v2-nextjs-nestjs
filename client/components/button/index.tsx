import * as React from "react";

import { ButtonCommonContainer, ButtonLinkContainer } from "./style";

interface ButtonProps {
        label: string;
}

export interface ButtonCommonProps extends ButtonProps {}

export const ButtonCommon: React.FunctionComponent<ButtonCommonProps> = ({ label }) => {
        return <ButtonCommonContainer>{label}</ButtonCommonContainer>;
};

export interface ButtonLinkProps extends ButtonProps {
        link: string;
}

export const ButtonLink: React.FunctionComponent<ButtonLinkProps> = ({ label, link }) => {
        return <ButtonLinkContainer href={link}>{label}</ButtonLinkContainer>;
};
