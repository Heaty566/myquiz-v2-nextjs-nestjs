import axios, { AxiosError } from 'axios';
import { apiActions } from '../store/api';
import { store } from '../store';
import { ApiResponse } from '../store/api/dto';

axios.defaults.baseURL = process.env.SERVER_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (req) {
        store.dispatch(apiActions.initReq());

        return req;
});
axios.interceptors.response.use(
        function (response) {
                store.dispatch(apiActions.resetState());
                return response;
        },
        function (error: AxiosError<ApiResponse<null>>) {
                store.dispatch(apiActions.resetState());
                if (error.response?.status === 400) {
                        store.dispatch(apiActions.updateErrorDetails(error.response.data.details));
                }

                return Promise.reject(error.response);
        },
);
export const http = {
        get: axios.get,
        post: axios.post,
        put: axios.put,
        delete: axios.delete,
};
