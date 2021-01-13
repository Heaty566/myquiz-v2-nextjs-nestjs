import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, registerUser, getUser } from './action';

export interface UserInfo {
        username: string;
        fullName: string;
        email: string;
        avatarUrl: string;
        isPremium: boolean;
        role: string;
}

export interface AuthState extends UserInfo {
        isLogin: boolean;
}

const initialState: AuthState = {
        email: '',
        fullName: '',
        avatarUrl: '',
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
                builder.addCase(getUser.fulfilled, (state, { payload }: PayloadAction<UserInfo>) => {
                        const newState = Object.assign(state, payload);
                        newState.isLogin = true;
                        return newState;
                });
        },
});

export const authActions = {
        loginUser,
        registerUser,
        getUser,
};
export const authReducer = auth.reducer;
