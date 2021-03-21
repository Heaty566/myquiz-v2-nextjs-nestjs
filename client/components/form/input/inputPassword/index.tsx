import * as React from 'react';
import Icons from '../../../dataDisplay/icons';

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
                                        id={name}
                                        $isShow={isShow}
                                />

                                <button onClick={() => setIsShow(!isShow)}>{isShow ? Icons.visible : Icons.invisible}</button>
                        </InputPasswordFieldWrapper>
                        {errorMessage && <InputPasswordError>{`${label} ${errorMessage}`}</InputPasswordError>}
                </InputPasswordContainer>
        );
};
