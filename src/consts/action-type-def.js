// @flow
import ApiError from '../store/models/api-error';

export type ACTION = {
  type: string,
  result: any,
  params: Object,
  apiError: ApiError,
  err: any,
  message: string,
  msgType: string,
  wait: number,
};

export type NotifyAction = {
  type: string,
  message: ?string,
  msgType: ?string,
  wait: number,
};

export type AlertAction = {
  type: string,
  title: string,
  message: string,
  okHandler: Function,
};
