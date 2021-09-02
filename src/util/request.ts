import StaticAxios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosPromise,
} from 'axios';
import { ResponseDto } from '../Dto/ResponseDto';

const baseURL = 'http://api.app.local';

const instance = StaticAxios.create({
  baseURL,
  timeout: 2000,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  const headers = config.headers ?? ({} as Record<string, any>);
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  config.headers = headers;
  config.headers.Accept = '*/*';
  return config;
});

export async function request<T>(
  url: string,
  config: AxiosRequestConfig = { method: 'GET' }
) {
  try {
    const res = await instance.request({ ...config, url });
    return res.data as ResponseDto<T>;
  } catch (error: any) {
    if (error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
}
