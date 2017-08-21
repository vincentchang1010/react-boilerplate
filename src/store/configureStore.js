// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root-reducer';
import ApiMiddlewawre from '../middleware/app-middleware';

/*
 function logger(store) {
 return (next) => (action) => {
 console.log(store);
 const { getState } = store;
 console.log('will dispatch', action);

 // Call the next dispatch method in the middleware chain.
 const returnValue = next(action);

 console.log('state after dispatch', getState());

 // This will likely be the action itself, unless
 // a middleware further in chain changed it.
 return returnValue;
 }
 }
 */

declare var DEBUG_MODE: boolean;

/* eslint-disable no-underscore-dangle */
export default function configureStore(preLoadedState: any): void {
  if (DEBUG_MODE) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
      rootReducer,
      preLoadedState,
      composeEnhancers(
        applyMiddleware(thunk, ApiMiddlewawre),
      ),
    );
  }

  return createStore(
    rootReducer,
    preLoadedState,
    compose(
      applyMiddleware(thunk, ApiMiddlewawre),
    ),
  );
}
/* eslint-enable */
