import React, { Component } from 'react';
import Rebase from 're-base';
import { TransitionSpring } from 'react-motion';

const base = Rebase.createClass('https://reduxchat.firebaseio.com');

export default class Chat extends Component {
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
   // this.props.dispatch(beginAdding(this.state.content, this.props.username));
    this.setState({
      content: null
    });


    base.post('chats', {
      data: this.props.messages.concat([{
        user: this.props.username,
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

  gotoBottom () {
    let list = React.findDOMNode(this.refs.list).querySelector('ol');
    list.scrollTop = list.scrollHeight;
  }

  render () {
    const willEnter = (key) => ({
      opacity: { val: 1, config: [100, 20]},
      text: key
    });

    const { messages } = this.props;

    const endValue = () => {
      let config = {};

      messages.forEach(function (message, index) {
        config[`index-${index}`] = {
          opacity: { val: 1}
        };
      });

      return config;
    };

    const defaultValue = () => {
      let config = {};

      messages.forEach(function (message, index) {
        config[`index-${index}`] = {
          opacity: { val: 0 }
        };
      });

      return config;
    };


    return (
      <div>
        <div ref="list">
            <TransitionSpring
              defaultValue={defaultValue()}
              endValue={endValue()}
              willEnter={willEnter}>
              {currentValue =>
                <ol>
                  {this.props.messages.map((message, index) => {
                    return (
                      <li
                        key={`index-${index}`}
                        style={{opacity: currentValue[`index-${index}`].opacity}}
                        className={message.user === this.props.username ? 'me' : null}
                        >
                        <strong>{message.user} {currentValue[`index-${index}`].opacity}</strong>
                        {message.content}
                      </li>
                    );
                  })}
                </ol>
              }
            </TransitionSpring>
        </div>
        <form onSubmit={::this.handleSubmit}>
          <input
            type="text"
            placeholder="Chat here dude ..."
            autoFocus="true"
            ref="input"
            value={this.state.content}
            onChange={::this.handleChange}
          />
        </form>

        <p onClick={this.props.promptForUsername}><u>Click here</u> to set your username (current: {this.props.username})</p>
      </div>
    );
  }
}
