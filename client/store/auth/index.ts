import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './action';

export interface UserInfo {
        username: string;
        fullName: string;
        email: string;
        isPremium: boolean;
        role: string;
}

export interface AuthState extends UserInfo {
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

        extraReducers: (builder) => {
                builder.addCase(loginUser.fulfilled, (state, { payload }) => {
                        state = { ...state, ...payload };
                });
        },
});

export const authActions = {
        loginUser,
        registerUser,
};
export const authReducer = auth.reducer;
