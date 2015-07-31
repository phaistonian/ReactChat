import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers, bindActionCreators } from 'redux';
import { provide, connect } from 'react-redux';
import thunk from 'redux-thunk';
import Rebase from 're-base';
import { messages, app } from '../reducers';
import { changeUsername } from '../actions/actions.js';
import '../styles.styl';

import Chat from '../components/Chat';

// const allMessages = localStorage.messages ? JSON.parse(localStorage.messages) : [];
const base = Rebase.createClass('https://reduxchat.firebaseio.com');


// App
const reducer = combineReducers({messages, app});
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);



@provide(store)
@connect(state => state)
export default class App extends Component {
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
    const { dispatch } = this.props;
   /// const actions = bindActionCreators({changeUsername}, dispatch);

    while (!username) {
      username = prompt('Enter username, please', this.props.app.username);
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
