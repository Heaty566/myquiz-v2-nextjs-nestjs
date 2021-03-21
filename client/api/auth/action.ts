import { createAsyncThunk } from '@reduxjs/toolkit';

//* Import
import { http } from '../http';
import { UserLoginDto, UserRegisterDto } from './dto';
import { ApiResponse } from '../../store/api/dto';
import { AxiosStatic } from 'axios';

class authApi {
        constructor(private readonly apiCall: AxiosStatic) {
                apiCall.defaults.baseURL = process.env.SERVER_URL + '/auth';
        }

        loginUser = createAsyncThunk<null, UserLoginDto>('loginUser', async (input) => {
                await this.apiCall.post<ApiResponse<null>>('/login', input);
                return null;
        });

        registerUser = createAsyncThunk<null, UserRegisterDto>('registerUser', async (input) => {
                await this.apiCall.post<ApiResponse<null>>('/register', input);
                return null;
        });
}

export const authApiCall = new authApi(http);
