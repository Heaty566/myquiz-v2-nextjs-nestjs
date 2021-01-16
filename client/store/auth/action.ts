import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../service/http';
import { UserLoginDto, UserRegisterDto, ForgotPasswordDto, ForgotPasswordUpdateDto } from './dto';
import { ApiResponse } from '../api/dto';
import { UserInfo } from '.';

export const loginUser = createAsyncThunk<null, UserLoginDto>('loginUser', async (input) => {
        await http.post<ApiResponse<null>>('/auth/login', input);
        return null;
});

export const registerUser = createAsyncThunk<null, UserRegisterDto>('registerUser', async (input) => {
        await http.post<ApiResponse<null>>('/auth/register', input);
        return null;
});

export const getUser = createAsyncThunk<UserInfo>('getUser', async () => {
        const res = await http.get<ApiResponse<UserInfo>>('/user');
        return res.data.data;
});
export const forgotPasswordCreate = createAsyncThunk<ApiResponse<void>, ForgotPasswordDto>('forgotPasswordCreate', async (input) => {
        const res = await http.post<ApiResponse<void>>('/auth/reset-password', input);
        return res.data;
});
export const forgotPasswordUpdate = createAsyncThunk<ApiResponse<void>, ForgotPasswordUpdateDto>('forgotPasswordUpdate', async (input) => {
        const res = await http.put<ApiResponse<void>>('/auth/reset-password', input);
        return res.data;
});
