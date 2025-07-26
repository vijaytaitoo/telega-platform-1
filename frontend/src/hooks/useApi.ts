import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../lib/axios';

type ApiError = {
  message: string;
  statusCode: number;
};

export const useApi = <T>(key: string[], url: string) => {
  return useQuery<T, ApiError>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await api.get<T>(url);
      return data;
    },
  });
};

export const useApiMutation = <T, V>(url: string, method: 'post' | 'put' | 'delete' = 'post') => {
  return useMutation<T, ApiError, V>({
    mutationFn: async (variables) => {
      const { data } = await api[method]<T>(url, variables);
      return data;
    },
  });
};
