import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../service/http';
import { UserInfo } from '.';
import { UserLoginDto, UserRegisterDto } from './dto';
import { apiActions } from '../api';

export const loginUser = createAsyncThunk<{}, UserLoginDto, {}>('loginUser', async (input, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
                const res = await http.post<UserInfo>('/auth/login', input);
                console.log(res);
        } catch (err) {
                dispatch(apiActions.updateErrorDetails(err.data));
        }

        return {};
});

export const registerUser = createAsyncThunk<{}, UserRegisterDto, {}>('registerUser', async (input, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
                const res = await http.post<UserRegisterDto>('/auth/register', input);
                console.log(res);
        } catch (err) {
                dispatch(apiActions.updateErrorDetails(err.data));
        }

        return {};
});
