import { AsyncStorage } from 'react-native';

import { SCAN, RESTORE, CLEAR } from './constants';

export function scanCode(code) {
  return async (dispatch, getState) => {
    const existingCodes = getState().scanner.codes;
    const nextCodes = [...existingCodes, code];
    await AsyncStorage.setItem('codes', JSON.stringify(nextCodes));

    return dispatch({
      type: SCAN,
      meta: {
        codes: nextCodes,
      },
    });
  };
}

export function restoreCodes() {
  return async (dispatch) => {
    const codesString = await AsyncStorage.getItem('codes');
    if (!codesString) {
      return undefined;
    }

    const codes = JSON.parse(codesString);
    return dispatch({
      type: RESTORE,
      meta: {
        codes,
      },
    });
  };
}

export function clearCodes() {
  return async (dispatch) => {
    await AsyncStorage.removeItem('codes');

    return dispatch({
      type: CLEAR,
    });
  };
}
