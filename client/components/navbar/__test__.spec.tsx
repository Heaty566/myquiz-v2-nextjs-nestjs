import { Navbar } from '.';
import * as Enzyme from 'enzyme';
import initComponent, { findByTestAttr } from '../../test/test.helper';

describe('Navbar', () => {
        it('is render', () => {
                const hello = Enzyme.shallow(initComponent(Navbar, {}));

                const test = findByTestAttr(hello, 'btn-login');
        });
});
