// @flow
/* eslint-disable no-console */
import ActionTypes from '../consts/action-types';

export type ACTION = {
  type: string,
};

declare var DEBUG_MODE: boolean;

export function relocate2currentPage(): ACTION {
  return { type: ActionTypes.RELOATE_TO_CURRENT_PAGE };
}

export function toggleLoginStatus(): ACTION {
  return { type: ActionTypes.TOGGLE_LOGIN_STATUS };
}

export function getVersionInfo() {
  return async (dispatch: Function) => {
    try {
      dispatch({ type: ActionTypes.GET_VERSION_INFO_SUCCESS, result: '#DEV' });
    } catch (err) {
      if (DEBUG_MODE) {
        console.log('got error');
        console.log(err);
      }
    }
  };
}
