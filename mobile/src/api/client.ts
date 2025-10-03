import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../state/user';

const API_URL = 'http://localhost:8000/api';

export const useApiClient = () => {
  const user = useRecoilValue(currentUserState);
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: user.token ? `Bearer ${user.token}` : '',
    },
  });
  return instance;
};

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
