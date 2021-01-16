import * as React from 'react';
import Image from 'next/image';

//* Import
import { TextFieldContainer, TextFieldErrorMsg, TextFieldLabel, FieldInput } from '../style.share';
import { TextFieldPasswordInput } from './style';

export interface TextFieldPasswordProps {
        name: string;
        label: string;
        placeHolder?: string;
        register: Function;
        errorMsg: string;
        type?: string;
}

export const TextFieldPassword: React.FunctionComponent<TextFieldPasswordProps> = ({
        name = '',
        label = '',
        placeHolder,
        register,
        errorMsg = '',
}) => {
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
                                <FieldInput
                                        name={name}
                                        placeholder={placeHolder}
                                        type={isSeen ? 'text' : 'password'}
                                        ref={(data) => register(data)}
                                        autoComplete="off"
                                />
                                <Image src={imgSrc} alt="password" height="16" width="16" onClick={() => setSeen(!isSeen)} />
                        </TextFieldPasswordInput>
                        {errorMsg && (
                                <TextFieldErrorMsg>
                                        {label} {errorMsg}
                                </TextFieldErrorMsg>
                        )}
                </TextFieldContainer>
        );
};
