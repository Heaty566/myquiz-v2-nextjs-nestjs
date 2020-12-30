import React, { useCallback } from 'react';
import { LangContainer, LangSel, LangOption } from './style';
export interface LangBtnProps {}

const langList = [
        { text: 'English', value: 'en' },
        { text: 'Vietnamese', value: 'vi' },
];

export const LangSelect: React.FunctionComponent<LangBtnProps> = () => {
        const hello = useCallback(() => {}, []);

        return (
                <LangContainer $justifyContent="space-between" $alignItems="center" $gutter={1} className="">
                        <img src="/asset/icon/global.svg" alt="" />
                        <LangSel name="lang" value="English" disabled />
                        <img src="/asset/icon/arrow-up.svg" alt="" />
                        <LangOption>
                                {langList.map((item) => (
                                        <li key={item.value} data-value={item.value}>
                                                {item.text}
                                        </li>
                                ))}
                        </LangOption>
                </LangContainer>
        );
};
