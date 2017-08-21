// @flow

export type AppNotification = {
  message: string,
  msgType: string,
  wait: number,
};

export type AppAlert = {
  title: string,
  message: string,
  okHandler: ?Function,
};
