import { useState } from 'react';
import axiosInstance from '@services/axiosInstance';

export const useAxios = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const useAxiosRequest = (
    url: string,
    method: string = 'GET',
    body: any = null,
    params: any = null,
  ): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      setError(false);
      setMessage(null);
      setData(null);
      setLoading(true);

      try {
        const response = await axiosInstance({
          url,
          method,
          data: body,
          params,
        });
        const { code, message, data } = response.data;
        if (code === 0) {
          setError(false);
          setMessage(message || null);
          setData(data);
          resolve(response.data);
        } else {
          setError(true);
          setMessage(message || 'An error occurred');
          reject(new Error(message || 'An error occurred'));
        }
      } catch (err: any) {
        if (err.name === 'AbortError' || err.name === 'CanceledError') {
          setMessage('Request was aborted.');
        } else {
          setMessage(
            err.response?.data?.message || 'An unexpected error occurred.',
          );
        }
        setError(true);
        reject(err);
      } finally {
        setLoading(false);
      }
    });
  };

  return { data, error, loading, message, useAxiosRequest, axiosInstance };
};
