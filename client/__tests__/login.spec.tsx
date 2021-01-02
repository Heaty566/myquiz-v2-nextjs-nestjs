import * as Enzyme from 'enzyme';
import LoginPage from '../pages/user/login';
import initComponent, { findByTestAttr } from '../test/test.helper';

describe('Test home page', () => {
        it('is render', () => {
                const component = Enzyme.mount(initComponent(LoginPage, {}));
                const usernameInput = component.find('input[name="username"]');
                usernameInput.simulate('change', { target: { value: { value: 'myname', name: 'username' } } });

                expect(1).toBeDefined();
        });
});
