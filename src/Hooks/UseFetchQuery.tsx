import { useQuery } from '@tanstack/react-query';
import Client from '../config/api/axios';

const fetchFunc = async (url: string) => {
  const res = await Client.get(url);
  return res.data;
};
const fetchByIdFunc = async (url: string, id: number) => {
  const res = await Client.get(`${url}/${id}`);
  return res.data;
};

const fetchPaginatedFunc = async (url: string, page: number) => {
  const res = await Client.get(`${url}?_page=${page}&_per_page=10`);
  return res.data;
};

export const useFetchQuery = (url: string, key: string) => {
  return useQuery({
    queryKey: [key],
    queryFn: () => fetchFunc(url),
  });
};

export const useFetchByIdQuery = (url: string, key: string, id: number) => {
  return useQuery({
    queryKey: [key, id],
    queryFn: () => fetchByIdFunc(url, id),
  });
};

export const usePaginatedFetchQuery = (
  url: string,
  key: string,
  pageNumber: number,
) => {
  return useQuery({
    queryKey: [key, pageNumber],
    queryFn: () => fetchPaginatedFunc(url, pageNumber),
  });
};
