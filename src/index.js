/*
message {
  id
  content
  user
  timestamp
}

users {
  id
  name
}

messages [ messageId ]
*/
import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { provide, connect } from 'react-redux';
import thunk from 'redux-thunk';
import Rebase from 're-base';
import './styles.styl';

import Chat from './Components/chat';

const allMessages = localStorage.messages ? JSON.parse(localStorage.messages) : [];
const base = Rebase.createClass('https://reduxchat.firebaseio.com');

// Reducers
const initialState = [];
function messages(state = initialState, action) {
  switch(action.type) {
    case 'LOAD':
      return action.messages;
    case 'ADD':
      return [...state, {
        content: action.content,
        user: action.user,
        timestamp: Date.now()
      }];
    default:
      return state;
  }
}

const initialAppState = {
  username: 'phaistonian'
};
function app(state = initialAppState, action) {
  switch(action.type) {
    case 'CHANGE_USERNAME':
      return {...state, username: action.username};
    default:
      return state;
  }
}

// Action (creators)
function add (content, user) {
  return {
    type: 'ADD',
    content,
    user
  };
}

// function load (loadedMessages) {
//   return {
//     type: 'LOAD',
//     messages: loadedMessages
//   };
// }

// function beginAddding (content, user) {
//   return async dispatch => {
//     return new Promise( (resolve) => {
//       allMessages.push({ content, user });
//       localStorage.messages = JSON.stringify(allMessages);
//       dispatch(add(content, user));
//       resolve();
//     });
//   };
// }

function changeUsername (username) {
  return {
    type: 'CHANGE_USERNAME',
    username
  };
}

// App
const reducer = combineReducers({messages, app});
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);



@provide(store)
@connect(state => state)
class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentWillMount () {
    if (!localStorage.username) {
      this.promptForUsername();
    }

    base.bindToState('chats', {
      context: this,
      state: 'messages',
      asArray: true
    });

    this.ref = base.syncState('chats', {
      context: this,
      state: 'messages',
      asArray: true
    });

    //this.props.dispatch(load(allMessages));
  }

  componentWillUnmount () {
    base.removeBinding(this.ref);
  }

  promptForUsername () {
    let username;

    while (!username) {
      username = window.prompt('Enter username, please', this.props.app.username);
    }

    localStorage.username = username;
    this.props.dispatch(changeUsername(username));
  }

  render () {
    return <Chat
      promptForUsername={::this.promptForUsername}
      username={this.props.app.username}
      dispatch={this.props.dispatch}
      messages={this.state.messages}
    />;
  }
}

React.render(
  <App />,
  document.body
);

