import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import apiClient from '../api/client';
import {queryClient} from '../App'; // Assume App.tsx exports queryClient

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

const fetchRecommendations = async ({pageParam = 1}) => {
  const {data} = await apiClient.get(`/recommendations?page=${pageParam}`);
  return data;
};

const swipeUser = async ({swipedId, action}: {swipedId: number; action: 'like' | 'nope'}) => {
  const {data} = await apiClient.post('/swipe', {
    swiped_id: swipedId,
    action,
  });
  return data;
};

const fetchLiked = async () => {
  const {data} = await apiClient.get<User[]>('/likes');
  return data;
};

export const useRecommendations = () => {
  return useInfiniteQuery({
    queryKey: ['recommendations'],
    queryFn: fetchRecommendations,
    getNextPageParam: lastPage => {
      return lastPage.current_page < lastPage.last_page
        ? lastPage.current_page + 1
        : undefined;
    },
    initialPageParam: 1,
  });
};

export const useSwipe = () => {
  return useMutation({
    mutationFn: swipeUser
  });
};

export const useLiked = () => {
  return useQuery<User[], Error>({queryKey: ['liked'], queryFn: fetchLiked});
};