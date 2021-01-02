import * as Enzyme from 'enzyme';
import * as hooks from '../../hooks/useLoading';
import Link from 'next/link';

import initComponent from '../../test/test.helper';
import { BtnFuncProps, BtnFunc, BtnLinkProps, BtnLink } from '.';
import { BtnFuncContainer, BtnLinkContainer } from './style';
import { Circle } from '../common/loading/style';

describe('<ButtonFunc />', () => {
        const renderFunction = (isApiCall = true) => {
                return Enzyme.mount(
                        initComponent<BtnFuncProps>(BtnFunc, { label: 'button content', isApiCall }),
                );
        };

        it('is render ok', () => {
                const component = renderFunction();
                const btn = component.find(`${BtnFuncContainer}`);

                expect(btn).toHaveLength(1);
        });

        describe('when isApiCall=true', () => {
                it('should not render loading', () => {
                        const component = renderFunction();

                        const btn = component.find(`${BtnFuncContainer}`);

                        expect(btn.text()).toBe('button content');
                        expect(btn).toHaveLength(1);
                });

                it('should render loading', () => {
                        jest.spyOn(hooks, 'useLoading').mockImplementation(() => true);
                        const component = renderFunction();

                        const btn = component.find(`${BtnFuncContainer}`);
                        const isLoadingExist = component.find(`${Circle}`);
                        expect(btn).toHaveLength(1);
                        expect(isLoadingExist).toHaveLength(1);
                });
        });

        describe('when isApiCall=false', () => {
                it('should not render loading', () => {
                        const component = renderFunction(false);

                        const btn = component.find(`${BtnFuncContainer}`);
                        const isLoadingExist = component.find(`${Circle}`);

                        expect(btn.text()).toBe('button content');
                        expect(btn).toHaveLength(1);
                        expect(isLoadingExist).toHaveLength(0);
                });

                it('should render loading', () => {
                        jest.spyOn(hooks, 'useLoading').mockImplementation(() => true);
                        const component = renderFunction(false);

                        const btn = component.find(`${BtnFuncContainer}`);
                        const isLoadingExist = component.find(`${Circle}`);
                        expect(btn).toHaveLength(1);
                        expect(isLoadingExist).toHaveLength(0);
                });
        });
});

describe('<ButtonLink />', () => {
        const renderFunction = (isApiCall = true) => {
                return Enzyme.mount(
                        initComponent<BtnLinkProps>(BtnLink, { label: 'button content', isApiCall, link: '/user/login' }),
                );
        };

        it('is render ok', () => {
                const component = renderFunction();
                const btn = component.find(`${BtnLinkContainer}`);

                expect(btn).toHaveLength(1);
        });

        describe('when isApiCall=true', () => {
                it('should not render loading', () => {
                        const component = renderFunction();
                        const btn = component.find(`${BtnLinkContainer}`);
                        const link = component.find(Link);

                        expect(link.debug().toString()).toContain('href="/user/login"');
                        expect(btn.text()).toBe('button content');
                        expect(btn).toHaveLength(1);
                });

                it('should render loading', () => {
                        jest.spyOn(hooks, 'useLoading').mockImplementation(() => true);
                        const component = renderFunction();

                        const btn = component.find(`${BtnLinkContainer}`);
                        const isLoadingExist = component.find(`${Circle}`);
                        expect(btn).toHaveLength(1);
                        expect(isLoadingExist).toHaveLength(1);
                });
        });

        describe('when isApiCall=false', () => {
                it('should not render loading', () => {
                        const component = renderFunction(false);

                        const btn = component.find(`${BtnLinkContainer}`);
                        const isLoadingExist = component.find(`${Circle}`);

                        expect(btn.text()).toBe('button content');
                        expect(btn).toHaveLength(1);
                        expect(isLoadingExist).toHaveLength(0);
                });

                it('should render loading', () => {
                        jest.spyOn(hooks, 'useLoading').mockImplementation(() => true);
                        const component = renderFunction(false);

                        const btn = component.find(`${BtnLinkContainer}`);
                        const isLoadingExist = component.find(`${Circle}`);
                        expect(btn).toHaveLength(1);
                        expect(isLoadingExist).toHaveLength(0);
                });
        });
});
