// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { translate } from 'react-i18next';
import Moment from 'moment';
import 'moment-timezone';
// import alertify from 'alertifyjs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../consts/actions';
import RootState from '../store/root-state';
import type { ActionsDef } from '../consts/actions-def';
import type { AppNotification, AppAlert } from '../store/app-notification-type-def';

type CompPropTypes = {
  // userInfo: UserInfo,
  actions: ActionsDef,
  children: ?React$Element<any>,
  notification: AppNotification,
  alert: AppAlert,
  reloadPageNotify: Object,
};

class VincentClientApp extends React.Component<any> {
  static contextTypes = {
    store: PropTypes.object,
    i18n: PropTypes.object,
  };

  static childContextTypes = {
    moment: PropTypes.func,
  };

  static defaultProps = {
    // userInfo: new UserInfo(),
  };

  constructor(props: CompPropTypes) {
    super(props);
  }

  getChildContext() {
    const lang: string = this.props.userInfo ?
      this.props.userInfo.lan :
      'zh-CN';
    Moment.locale(lang);
    // Moment.weekdays(true, 1);
    Moment.tz.setDefault('Africa/Bissau');
    return {
      moment: Moment,
    };
  }

  componentWillMount() {
    this.props.actions.getVersionInfo();
  }

  componentWillReceiveProps(nextProps: {
    notification: AppNotification,
    alert: AppAlert,
    // userInfo: UserInfo,
    reloadPageNotify: Object,
  }) {
    if (
      nextProps.notification &&
      nextProps.notification.message &&
      nextProps.notification.message !== '' &&
      nextProps !== this.props.notification
    ) {
      // TODO dismiss other alert message.
      /*
      const { message, msgType, wait } = nextProps.notification;
      alertify.notify(message, msgType, wait).dismissOthers();
      */
      this.props.actions.clearNotification();
    }

    if (
      nextProps.alert &&
      nextProps.alert.message &&
      nextProps.alert.message !== '' &&
      this.props.alert !== nextProps.alert
    ) {
      // TODO alert impl.
      /*
      alertify.alert(
        nextProps.alert.title,
        nextProps.alert.message,
        nextProps.alert.okHandler,
      );
      */
    }

    // TODO switch lang by user's language
    /*
    if (this.props.userInfo !== nextProps.userInfo) {
      this.context.i18n.changeLanguage(
        nextProps.userInfo.lan,
      );
    }
    */

    if (this.props.reloadPageNotify !== nextProps.reloadPageNotify) {
      browserHistory.push(location.pathname + location.search);
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    logined: state.logined,
    notification: state.notification,
    alert: state.alert,
    // userInfo: state.userInfo,
    reloadPageNotify: state.reloadPageNotify,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) };
}

export default translate(['common'], { wait: true })(
  connect(mapStateToProps, mapDispatchToProps)(VincentClientApp));
