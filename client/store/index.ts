import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import { apiReducer } from './api';

const reducers = combineReducers({
        auth: authReducer,
        api: apiReducer,
});

export const store = configureStore({
        reducer: reducers,
        devTools: process.env.NODE_ENV === 'production' ? false : true,
});

export type RootState = ReturnType<typeof reducers>;
