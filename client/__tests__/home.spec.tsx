import HomePage from '../pages';
import * as Enzyme from 'enzyme';
import * as React from 'react';

describe('Test home page', () => {
        it('is render', () => {
                const hello = Enzyme.shallow(<HomePage />);
                console.log(hello.debug());
                expect(1).toBeDefined();
        });
});
