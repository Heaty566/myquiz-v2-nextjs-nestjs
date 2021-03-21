import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

//* Import
import { authApiCall } from '../../api/auth/action';

export interface UserInfo {
        name: string;
        fullName: string;
        email: string;
        avatarUrl: string;
        isPremium: boolean;
        role: string;
}

export interface UserState extends UserInfo {
        isLogin: boolean;
}

const initialState: UserState = {
        email: '',
        fullName: '',
        avatarUrl: '',
        isLogin: false,
        isPremium: false,
        role: 'USER',
        name: '',
};

const user = createSlice({
        name: 'user',
        initialState,
        reducers: {
                resetLogin: () => {
                        return initialState;
                },
        },
        extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
                builder.addCase(authApiCall.loginUser.fulfilled, (state) => {
                        state.isLogin = true;
                        return state;
                });
                builder.addCase(authApiCall.registerUser.fulfilled, (state) => {
                        state.isLogin = true;
                        return state;
                });
        },
});

export const authReducer = user.reducer;
