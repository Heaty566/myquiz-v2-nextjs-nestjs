import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../service/http';
import { UserLoginDto } from './dto';
import { ApiResponse } from '../api/dto';
import { UserInfo } from '.';

export const loginUser = createAsyncThunk<null, UserLoginDto>('loginUser', async (input) => {
        await http.post<ApiResponse<null>>('/auth/login', input);
        return null;
});

export const registerUser = createAsyncThunk<null, UserLoginDto>('registerUser', async (input) => {
        await http.post<ApiResponse<null>>('/auth/register', input);
        return null;
});

export const getUser = createAsyncThunk<UserInfo>('getUser', async () => {
        const res = await http.get<ApiResponse<UserInfo>>('/user');
        return res.data.data;
});
