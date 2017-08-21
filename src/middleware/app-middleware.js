// @flow
/* eslint-disable no-console */
import ActionTypes, { ACTION } from '../consts/action-types';

declare var DEBUG_MODE: boolean;
export const REQ_INFO = 'REQ_INFO';

export function checkResHasError(res: any): boolean {
  const keys = Object.keys(res);
  return keys.some(k => k === 'error');
}

export default function AppMiddleware(store: any) {
  return (next: any) => async (action: ACTION) => {
    if (action.type !== ActionTypes.CALL_API) {
      return next(action);
    }
    const request = action[REQ_INFO];
    const { serviceCallFunc, params, failureType, successType, sendingType } = request;
    const { dispatch } = store;

    dispatch({ type: sendingType });
    try {
      const res = await serviceCallFunc(params);
      // TODO check response and is there is errors(business too)
      const hasError: boolean = false;
      const result: any = res;
      const someError: string = 'some errors';
      if (hasError) {
        dispatch({
          type: failureType,
          err: someError,
          params,
        });
      } else {
        dispatch({
          type: successType,
          result,
          params,
        });
      }
    } catch (err) {
      if (DEBUG_MODE) {
        console.log('got error');
        console.log(err);
      }
      dispatch({ type: failureType, err, params });
    }

    return next(action);
  };
}
