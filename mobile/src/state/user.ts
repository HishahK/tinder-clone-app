import {atom} from 'recoil';

export const currentUserState = atom({
  key: 'currentUserState',
  default: {id: 1, name: 'Test User'}, // Hardcoded for this example
});