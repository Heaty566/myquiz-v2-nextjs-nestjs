import * as React from 'react';
import { TextFieldWrapper } from './style';
import { TextFieldContainer, TextFieldError, TextFieldLabel, TextFieldInput } from '../style.share';
export interface TextFieldProps {
        name: string;
        label: string;
        placeHolder?: string;
        register: Function;
        errorMsg: string;
        type?: string;
}

export const TextField: React.FunctionComponent<TextFieldProps> = ({
        name = '',
        label = '',
        placeHolder,
        type = 'text',
        register,
        errorMsg = '',
}) => {
        return (
                <TextFieldContainer>
                        <TextFieldLabel htmlFor={name}>{label}</TextFieldLabel>
                        <TextFieldWrapper className={errorMsg ? 'active' : ''}>
                                <TextFieldInput name={name} placeholder={placeHolder} type={type} ref={(data) => register(data)} />
                        </TextFieldWrapper>
                        {errorMsg && (
                                <TextFieldError>
                                        {label} {errorMsg}
                                </TextFieldError>
                        )}
                </TextFieldContainer>
        );
};
