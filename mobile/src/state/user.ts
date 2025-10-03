import { atom } from 'recoil';

export const currentUserState = atom({
  key: 'currentUserState',
  default: {
    id: 0,
    name: '',
    token: '',
  },
});
