import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JoiError } from './dto';

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
                initReq: (state) => {
                        state.isLoading = true;
                },
                resetState: (state) => {
                        state.isLoading = false;
                        state.errorDetails = initialState.errorDetails;
                        state.isError = initialState.isError;
                },
                updateErrorDetails: (state, { payload }: PayloadAction<JoiError>) => {
                        state.errorDetails = payload;
                        state.isError = true;
                },
        },
        extraReducers: () => {},
});

export const apiActions = {
        ...reducer.actions,
};
export const apiReducer = reducer.reducer;
