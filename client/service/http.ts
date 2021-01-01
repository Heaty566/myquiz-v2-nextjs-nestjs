import axios from 'axios';
import { apiActions } from '../store/api';
import { store } from '../store';

axios.defaults.baseURL = process.env.SERVER_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (req) {
        store.dispatch(apiActions.resetState());

        return req;
});
axios.interceptors.response.use(
        function (response) {
                return response;
        },
        function (error) {
                store.dispatch(apiActions.initGetRes());

                return Promise.reject(error.response.data);
        },
);
export const http = {
        get: axios.get,
        post: axios.post,
        put: axios.put,
        delete: axios.delete,
};
