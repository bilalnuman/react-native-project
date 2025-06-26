
import apiClient from '../../../lib/axios';
import { URLS } from '@utils/constants';

export const login = (payload: any) =>
    apiClient.post(URLS.LOGIN, payload);

export const signup = (payload: any) =>
    apiClient.post(URLS.REGISTER, payload);
