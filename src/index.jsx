import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { browserHistory, Redirect, Route, Router } from 'react-router';

import VincentClientApp from './components/vincent-client-app';
import MainPage from './components/main-page';
import LoginPage from './components/login-page';
import FirstPage from './components/first-page';

// import 'jquery';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/_custom.scss';

import configureStore from './store/configureStore';
import i18n from './i18n';
import RouteLinks from './consts/route-links';

const store = configureStore();

ReactDom.render(
  (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Router history={browserHistory}>

          <Redirect from="/" to={`/${RouteLinks.LOGIN}`} />

          <Route path="/" component={VincentClientApp}>

            <Route path={`${RouteLinks.LOGIN}`} component={LoginPage} />

            <Redirect from={`${RouteLinks.MAIN}`} to={`${RouteLinks.MAIN}/${RouteLinks.FIRST_PAGE}`} />

            <Route path={`${RouteLinks.MAIN}`} component={MainPage}>
              <Route path={`${RouteLinks.FIRST_PAGE}`} component={FirstPage} />
            </Route>
          </Route>
        </Router>
      </Provider>
    </I18nextProvider>
  ),
  document.getElementById('client-app'),
);
