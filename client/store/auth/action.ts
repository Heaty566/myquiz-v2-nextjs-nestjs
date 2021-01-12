import { JoiError } from '../api/dto';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../service/http';
import { UserInfo } from '.';
import { UserLoginDto, UserRegisterDto } from './dto';
import { ApiResponse } from '../api/dto';

export const loginUser = createAsyncThunk<UserInfo, UserLoginDto>('loginUser', async (input) => {
        const res = await http.post<ApiResponse<UserInfo>>('/auth/login', input);
        return res.data.data;
});

export const registerUser = createAsyncThunk<UserInfo, UserLoginDto>('registerUser', async (input) => {
        const res = await http.post<ApiResponse<UserInfo>>('/auth/register', input);
        return res.data.data;
});
