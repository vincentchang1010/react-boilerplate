// @flow
import React from 'react';
import PropTypes from 'prop-types';
import 'babel-polyfill';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../consts/actions';
import Header from './header';

type CompPropTypes = {
  children: ?React$Element<any>,
  // actions: PropTypes.objectOf(PropTypes.func),
  logined: boolean,
};

class MainPage extends React.Component<any> {
  static contextTypes = {
    store: PropTypes.object,
  };

  static childContextTypes = {
    userId: PropTypes.number,
  };

  constructor(props: CompPropTypes) {
    super(props);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = (): void => {
    // TODO get user info
  };

  render(): ?React$Element<any> {
    return (
      <div>
        {this.props.logined ?
          (<div>
            <Header />
            {this.props.children}
          </div>)
          : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { logined: state.logined };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
