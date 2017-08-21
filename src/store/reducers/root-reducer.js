// @flow
import ActionTypes, { ACTION } from '../../consts/action-types';


import RootState from '../root-state';

/* eslint-disable arrow-body-style */
declare var DEBUG_MODE: boolean;

/* eslint-disable-next-line indent */
export default function RootReducer(state: RootState = new RootState(), action: ACTION) {
  let newState: RootState;

  // default handling
  switch (action.type) {
    case ActionTypes.RELOATE_TO_CURRENT_PAGE:
      newState = Object.assign(
        new RootState(),
        {
          ...state,
          reloadPageNotify: {},
        },
      );
      break;
    case ActionTypes.TOGGLE_LOGIN_STATUS:
      newState = Object.assign(
        new RootState(),
        {
          ...state,
          logined: !state.logined,
        },
      );
      break;
    case ActionTypes.GET_VERSION_INFO_SUCCESS:
      newState = Object.assign(
        new RootState(),
        {
          ...state,
          versionInfo: action.result,
        },
      );
      break;
    default:
      newState = Object.assign(
        new RootState(),
        { ...state },
        // {
        // setting: settingReducer(state.setting, action),
        // },
      );
      break;
  }

  // data loading status handling
  switch (action.type) {
    default:
      break;
  }

  return newState;
}
