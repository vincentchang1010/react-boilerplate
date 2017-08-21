// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import * as Actions from '../consts/actions';

type CompPropTypes = {}

class FirstPage extends React.Component<any> {
  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object,
    moment: PropTypes.func,
  };

  constructor(props: CompPropTypes) {
    super(props);
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render(): ?React$Element<any> {
    return (
      <div>
        this is the first page.
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) };
}

export default translate()(connect(mapStateToProps, mapDispatchToProps)(FirstPage));
