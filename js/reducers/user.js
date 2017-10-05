
import type { Action } from '../actions/types';
import { SET_USER } from '../actions/user';

export type State = {
    name: string,
    phoneNumber: string,
    contacts: Array,
    favList: Array,
}

const initialState = {
  name: '',
  phoneNumber: '',
  contacts: [],
  favList: [],
  contactDetail: undefined
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_USER) {
    return {
      ...state,
      name: action.payload,
    };
  }
  return state;
}
