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
import { createStore, applyMiddleware } from 'redux';
import { provide, connect } from 'react-redux';
import thunk from 'redux-thunk';
import Rebase from 're-base';
import './styles.styl';

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


// Action (creators)
function add (content, user) {
  return {
    type: 'ADD',
    content,
    user
  };
}

function load (loadedMessages) {
  return {
    type: 'LOAD',
    messages: loadedMessages
  };
}

function beginAddding (content, user) {
  return async dispatch => {
    return new Promise( (resolve) => {
      allMessages.push({ content, user });
      localStorage.messages = JSON.stringify(allMessages);
      dispatch(add(content, user));
      resolve();
    });
  };
}

// App
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(messages);



@provide(store)
@connect(state => ({messages: state}))
class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentWillMount () {
    //this.props.dispatch(load(allMessages));

    let username = localStorage.username;
    while (!username) {
      username = window.prompt('Enter username, please');
    }

    localStorage.username = username;
    this.setState({
      username: username
    });

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
  }

  componentWillUnmount () {
    base.removeBinding(this.ref);
  }

  componentWillUpdate () {

  }

  render () {
    return <Chat dispatch={this.props.dispatch} messages={this.state.messages} username={this.state.username} />;
  }
}


class Chat extends Component {
  constructor (props) {
    super(props);
    this.state = {
      content: '',
      username: this.props.username
    };
  }

  componentWillReceiveProps () {
    setTimeout(::this.gotoBottom, 1);
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.dispatch(beginAddding(this.state.content, this.state.user));
    this.setState({
      content: null
    });


    base.post('chats', {
      data: this.props.messages.concat([{
        user: this.state.username,
        content: this.state.content
      }]),
      context: this,
      /*
       * This 'then' method will run after the
       * post has finished.
       */
      then: () => {
        console.log('POSTED');
      }
    });
  }

  handleChange (event) {
    this.setState({content: event.target.value});
  }

   handleChangeUserame (event) {
    this.setState({username: event.target.value});
  }

  gotoBottom () {
    let list = React.findDOMNode(this.refs.list);
    list.scrollTop = list.scrollHeight;
  }

  render () {
    return (
      <div>
        <div>
          <ol ref="list">
            {this.props.messages.map((message, index) => {
              return (
                <li key={`index-${index}`}>
                  <strong>{message.user}</strong>
                  {message.content}
                </li>
              );
            })}
          </ol>
        </div>
        <form onSubmit={::this.handleSubmit}>
          <input
            type="text"
            placeholder="Chat here .."
            autoFocus="true"
            ref="input"
            value={this.state.content}
            onChange={::this.handleChange}
          />
        </form>

        <hr />

        <details>
          <summary>Set username</summary>
          <input type="text" value={this.state.username} onChange={::this.handleChangeUserame} />
        </details>
      </div>
    );
  }
}

React.render(
  <App />,
  document.body
);

