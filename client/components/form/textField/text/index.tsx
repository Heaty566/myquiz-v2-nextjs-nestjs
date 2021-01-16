import * as React from 'react';

//* Import
import { TextFieldContainer, TextFieldErrorMsg, TextFieldLabel, FieldInput } from '../style.share';
import { TextFieldInput } from './style';
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
                        <TextFieldInput className={errorMsg ? 'active' : ''}>
                                <FieldInput name={name} placeholder={placeHolder} type={type} ref={(data) => register(data)} autoComplete="on" />
                        </TextFieldInput>
                        {errorMsg && (
                                <TextFieldErrorMsg>
                                        {label} {errorMsg}
                                </TextFieldErrorMsg>
                        )}
                </TextFieldContainer>
        );
};
