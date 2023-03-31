/* eslint-disable import/prefer-default-export */
import { authApi } from '../libs/axiosConfig';
import { ArStar } from '../types/ar';

export const setarStar = async (data: ArStar) => {
  await authApi.post('/cultural-properties/star/', data);
};
