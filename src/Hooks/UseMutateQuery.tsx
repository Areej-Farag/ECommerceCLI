import { useMutation, useQueryClient } from '@tanstack/react-query';
import Client from '../config/api/axios';

const POST = async (url: string, data: any) => {
  const res = await Client.post(url, data);
  return res.data;
};

const PUT = async (url: string, data: any) => {
  const res = await Client.put(url, data);
  return res.data;
};

const DELETE = async (url: string) => {
  const res = await Client.delete(url);
  return res.data;
};

export const usePostQuery = (url: string, invalidateKey?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => POST(url, data),
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: [invalidateKey] });
      }
    },
  });
};

export const usePutQuery = (url: string, invalidateKey?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => PUT(`${url}/${data.id}`, data),
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: [invalidateKey] });
      }
    },
  });
};

export const useDeleteQuery = (url: string, invalidateKey?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => DELETE(url),
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: [invalidateKey] });
      }
    },
  });
};
