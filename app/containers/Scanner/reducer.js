import { SCAN, RESTORE, CLEAR } from './constants';

const initialState = {
  codes: [],
};

export default function scanner(state = initialState, action) {
  switch (action.type) {
    case SCAN:
      return {
        ...state,
        codes: action.meta.codes,
      };
    case RESTORE:
      return {
        ...state,
        codes: action.meta.codes,
      };
    case CLEAR:
      return {
        ...state,
        codes: [],
      };
    default:
      return state;
  }
}
