import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './action';
import { RootState } from '..';

export interface UserInfo {
        username: string;
        fullName: string;
        email: string;
        isPremium: boolean;
        role: string;
}

interface AuthState extends UserInfo {
        isLogin: boolean;
}

const initialState: AuthState = {
        email: '',
        fullName: '',
        isLogin: false,
        isPremium: false,
        role: 'USER',
        username: '',
};

const auth = createSlice({
        name: 'auth',
        initialState,
        reducers: {},
});

export const authActions = {
        loginUser,
        registerUser,
};
export const authReducer = auth.reducer;
export const authSelector = (state: RootState) => state.auth;
