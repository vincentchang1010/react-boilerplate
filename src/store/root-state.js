// @flow
import type { AppNotification, AppAlert } from './app-notification-type-def';

export default class RootState {
  currentPage: 'test page';
  logined: boolean = false;
  notification: AppNotification = { message: '', msgType: 'success', wait: 5 };
  alert: AppAlert = { title: '', message: '', okHandler: null };
  reloadPageNotify: Object = {};
  versionInfo: string = '';
}
