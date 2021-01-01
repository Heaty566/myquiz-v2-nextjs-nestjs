import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface JoiError {
        [key: string]: string;
}

export interface ApiState {
        isLoading: boolean;
        errorDetails: JoiError;
        isError: boolean;
}
const initialState: ApiState = {
        isLoading: false,
        errorDetails: {},
        isError: false,
};

const reducer = createSlice({
        name: 'api',
        initialState,
        reducers: {
                initGetRes: (state) => {
                        state.isLoading = false;
                },
                resetState: (state) => {
                        state.isLoading = true;
                        state.errorDetails = initialState.errorDetails;
                        state.isError = initialState.isError;
                },
                updateErrorDetails: (state, { payload }: { payload: JoiError }) => {
                        state.errorDetails = payload;
                        state.isError = true;
                },
        },
});

export const apiActions = {
        ...reducer.actions,
};

export const apiReducer = reducer.reducer;
export const apiSelector = (state: RootState) => state.api;
