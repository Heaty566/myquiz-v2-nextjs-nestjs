import * as React from 'react';
import Image from 'next/image';

//* Import
import { InputPasswordContainer, InputPasswordError, InputPasswordField, InputPasswordLabel, InputPasswordFieldWrapper } from './style';

export interface InputPasswordProps {
        label: string;
        errorMessage: string;
        name: string;
        register: Function;
}

export const InputPassword: React.FunctionComponent<InputPasswordProps> = ({ errorMessage, label, name, register }) => {
        const [isShow, setIsShow] = React.useState(false);

        return (
                <InputPasswordContainer>
                        <InputPasswordLabel htmlFor={name}>{label}</InputPasswordLabel>
                        <InputPasswordFieldWrapper>
                                <InputPasswordField
                                        autoComplete="off"
                                        name={name}
                                        ref={(value) => register(value)}
                                        type={isShow ? 'text' : 'password'}
                                />
                                <Image
                                        src={`/asset/icons/${isShow ? '' : 'in'}visible.svg`}
                                        alt="invisible"
                                        height="19"
                                        width="19"
                                        onClick={() => setIsShow(!isShow)}
                                />
                        </InputPasswordFieldWrapper>
                        {errorMessage && <InputPasswordError>{`${label} ${errorMessage}`}</InputPasswordError>}
                </InputPasswordContainer>
        );
};
