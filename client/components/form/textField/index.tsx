import * as React from 'react';
import Image from 'next/image';

//* Import style
import { TextFieldInput, TextFieldContainer, TextFieldLabel, TextFieldPasswordInput, TextFieldWrapper, TextFieldError } from './style';

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

export const TextFieldPassword: React.FunctionComponent<TextFieldProps> = ({ name = '', label = '', placeHolder, register, errorMsg = '' }) => {
        const [isSeen, setSeen] = React.useState(false);
        const [imgSrc, setImageSrc] = React.useState('/asset/icon/invisible.svg');

        React.useEffect(() => {
                const newSrc = '/asset/icon/' + (isSeen ? 'visible.svg' : 'invisible.svg');
                setImageSrc(newSrc);
        }, [isSeen]);

        return (
                <TextFieldContainer>
                        <TextFieldLabel htmlFor={name}>{label}</TextFieldLabel>
                        <TextFieldPasswordInput className={errorMsg ? 'active' : ''}>
                                <TextFieldInput
                                        name={name}
                                        placeholder={placeHolder}
                                        type={isSeen ? 'text' : 'password'}
                                        ref={(data) => register(data)}
                                />
                                <Image src={imgSrc} alt="password" height="16" width="16" onClick={() => setSeen(!isSeen)} />
                        </TextFieldPasswordInput>
                        {errorMsg && (
                                <TextFieldError>
                                        {label} {errorMsg}
                                </TextFieldError>
                        )}
                </TextFieldContainer>
        );
};
