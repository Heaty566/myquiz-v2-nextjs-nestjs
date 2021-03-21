import { createAsyncThunk } from '@reduxjs/toolkit';

//* Import
import { http } from '../http';

import { AxiosStatic } from 'axios';
import { ApiResponse } from '../../store/api/dto';
import { UserInfo } from '../../store/user';

class userApi {
        constructor(private readonly apiCall: AxiosStatic) {
                apiCall.defaults.baseURL = process.env.SERVER_URL + '/user';
        }

        getUser = createAsyncThunk<void>('loginUser', async () => {
                const user = await this.apiCall.get<ApiResponse<UserInfo>>('');
                console.log(user);
        });
}

export const userApiCall = new userApi(http);
