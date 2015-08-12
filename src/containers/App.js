import React, { Component } from 'react';
import { changeUsername } from '../actions/actions.js';
import { connect } from 'react-redux';
import Rebase from 're-base';
import Chat from '../components/Chat';
import '../styles.styl';


// const allMessages = localStorage.messages ? JSON.parse(localStorage.messages) : [];
const base = Rebase.createClass('https://reduxchat.firebaseio.com');

@connect(state => state)
export default class Root extends Component {
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
