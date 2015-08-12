import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { messages, app } from './reducers';


import App from './Containers/App';

const reducer = combineReducers({messages, app});
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

React.render((
  <Provider store={store}>
    { () => <App />}
  </Provider>
  ), document.body
);

