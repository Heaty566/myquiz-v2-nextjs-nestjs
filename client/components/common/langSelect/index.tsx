import React from 'react';
import Image from 'next/image';

//* Import
import { LangContainer, LangSel, LangOption } from './style';

export interface LangBtnProps {}

const langList = [
        { text: 'English', value: 'en' },
        { text: 'Vietnamese', value: 'vi' },
];

export const LangSelect: React.FunctionComponent<LangBtnProps> = () => {
        return (
                <LangContainer $justifyContent="space-between" $alignItems="center" className="">
                        <Image src="/asset/icon/global.svg" alt="" height="20px" width="20px" />
                        <LangSel name="lang" value="English" disabled />
                        <Image src="/asset/icon/arrow-up.svg" alt="" height="20px" width="20px" />
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
