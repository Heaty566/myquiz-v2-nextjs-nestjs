import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiReducer, ApiState } from './api';
import { authReducer, UserState } from './user';

export interface RootState {
        api: ApiState;
        user: UserState;
}

const reducers = combineReducers<RootState>({
        api: apiReducer,
        user: authReducer,
});

export const store = configureStore({
        reducer: reducers,
        devTools: process.env.NODE_ENV === 'production' ? false : true,
});
