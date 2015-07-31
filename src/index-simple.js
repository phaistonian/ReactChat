//import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// reducer
function myReducer (state = 0, action) {
  switch (action.type) {
    case 'ADD':
      return state + 1;
    case 'DEL':
      return state - 1;
    default:
      return state;
  }
}

function myAnotherReducer (state = 'visible', action) {
  switch (action.type) {
    case 'SHOW':
      return 'visible';
    case 'HIDE':
      return 'hidden';
    default:
      return state;
  }
}

// action creators
function add () {
  return {
    type: 'ADD'
  };
}

function del () {
  return {
    type: 'DEL'
  };
}

function addAsync (delay = 1000) {
  return dispatch => {
    return setTimeout(() => {
      return dispatch(add());
    }
    , delay);
  };
}

function show () {
  return {
    type: 'SHOW'
  }
}

function hide () {
  return {
    type: 'HIDE'
  }
}


// app
const storeWithMiddleware = applyMiddleware(thunk)(createStore);
const combinedReducers = combineReducers({ myReducer, myAnotherReducer});
const store = storeWithMiddleware(combinedReducers);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(add());
store.dispatch(add());
store.dispatch(add());
store.dispatch(del());
store.dispatch(add());
store.dispatch(add());
store.dispatch(hide());
store.dispatch(addAsync(8000));

