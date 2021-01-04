/* eslint-disable react/jsx-props-no-spreading */
import { ThemeProvider } from 'styled-components';
import * as React from 'react';
import { Provider } from 'react-redux';

import { store } from '../store';
import { variable } from '../style';

export default function initComponent<T>(Component: any, props: T) {
        return (
                <Provider store={store}>
                        <ThemeProvider theme={variable}>
                                <Component {...props} />
                        </ThemeProvider>
                </Provider>
        );
}

export const findByTestAttr = (wrapper: any, val: string) => {
        return wrapper.find(`[data-test="${val}"]`);
};
