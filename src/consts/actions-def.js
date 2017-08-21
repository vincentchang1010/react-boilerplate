// @flow
import type { AlertAction, NotifyAction } from './action-type-def';

export type ActionsDef = {
  alertMessage: (title: string, message: string, okHandler: any) => AlertAction,
  clearNotification: () => void,
  notifyError: (message: string, wait: ?number) => NotifyAction,
  notifySuccess: (message: string, wait: ?number) => NotifyAction,
  relocate2currentPage: Function,
  getVersionInfo: Function,
  addAccountThenRefreshAccountList: Function,
}
