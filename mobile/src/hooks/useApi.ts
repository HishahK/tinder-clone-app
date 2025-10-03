import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useApiClient } from '../api/client';

export interface Picture {
  id: number;
  url: string;
}
export interface User {
  id: number;
  name: string;
  age: number;
  pictures: Picture[];
}

export const useRecommendations = () => {
  const client = useApiClient();
  return useInfiniteQuery({
    queryKey: ['recommendations'],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await client.get(`/recommendations?page=${pageParam}`);
      return data;
    },
    getNextPageParam: lastPage => {
      return lastPage.current_page < lastPage.last_page ? lastPage.current_page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const useSwipe = () => {
  const client = useApiClient();
  return useMutation({
    mutationFn: async ({ swipedId, action }: { swipedId: number; action: 'like' | 'nope' }) => {
      const { data } = await client.post('/swipe', { swiped_id: swipedId, action });
      return data;
    },
  });
};

export const useLiked = () => {
  const client = useApiClient();
  return useQuery({
    queryKey: ['liked'],
    queryFn: async () => {
      const { data } = await client.get('/likes');
      return data;
    },
  });
};
