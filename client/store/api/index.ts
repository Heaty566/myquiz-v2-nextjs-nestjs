import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JoiError } from './dto';

export interface ApiState {
        isLoading: boolean;
        errorDetails: JoiError;
        isError: boolean;
        message: string;
}
const initialState: ApiState = {
        isLoading: false,
        errorDetails: {},
        isError: false,
        message: '',
};

const reducer = createSlice({
        name: 'api',
        initialState,
        reducers: {
                initReq: (state: ApiState) => {
                        state.isLoading = true;
                },
                resetState: () => {
                        return initialState;
                },
                updateErrorDetails: (state: ApiState, { payload }: PayloadAction<JoiError>) => {
                        const newState = { ...state };
                        newState.errorDetails = payload;
                        newState.isError = true;
                        return newState;
                },
        },
});

export const apiActions = {
        ...reducer.actions,
};
export const apiReducer = reducer.reducer;
