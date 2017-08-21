// @flow
import React from 'react';
import { browserHistory } from 'react-router';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../consts/actions';
import type { ActionsDef } from '../consts/actions-def';
import RouteLinks from '../consts/route-links';

type CompPropTypes = {
  t: Function,
  actions: ActionsDef,
  versionInfo: string,
}

class LoginPage extends React.Component<any> {
  constructor(props: CompPropTypes) {
    super(props);
  }

  componentWillMount() {
    console.log('login page');
  }

  render(): ?React$Element<any> {
    const { t, versionInfo }: CompPropTypes = this.props;
    return (
      <div>
        <button onClick={() => {
          this.props.actions.toggleLoginStatus();
          const url: string =
            `/${RouteLinks.MAIN}/${RouteLinks.FIRST_PAGE}`;
          browserHistory.push(url);
        }}
        >{t('LOGIN')}
        </button>
        {versionInfo}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { versionInfo: state.versionInfo };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) };
}

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage));
