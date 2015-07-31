import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware, bindActionCreators } from 'redux';
import { provide, connect } from 'react-redux';
import thunk from 'redux-thunk';

const AVAILABLE_SUBREDDITS = ['apple', 'pics'];

// ------------
// reducers
// ------------

function selectedReddit(state = 'apple', action) {
  switch (action.type) {
  case 'SELECT_REDDIT':
    return action.reddit;
  default:
    return state;
  }
}

function postsByReddit(state = { }, action) {
  switch (action.type) {
  case 'RECEIVE_POSTS':
    return {
      ...state,
      [action.reddit]: action.posts
    }
  default:
    return state;
  }
}

// --------------
// action creators
// --------------

function selectReddit(reddit) {
  return {
    type: 'SELECT_REDDIT',
    reddit
  };
}

function receivePosts(reddit, json) {
  return {
    type: 'RECEIVE_POSTS',
    reddit: reddit,
    posts: json.data.children
  };
}

function fetchPosts(reddit) {
  return async dispatch => {
    const req = await fetch(`http://www.reddit.com/r/${reddit}.json`);
    const json = await req.json();
    return dispatch(receivePosts(reddit, json));
  };
}

function fetchPostsIfNeeded(reddit) {
  return (dispatch, getState) => {
    if (!getState().postsByReddit[reddit]) {
      return dispatch(fetchPosts(reddit));
    }
  };
}

// ------------
// app
// ------------

function logger({ getState }) {
  return next => action => {
    console.info('dispatching', action);
    const result = next(action);
    console.log('state after', getState());
    return result;
  };
}

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const reducer = combineReducers({ selectedReddit, postsByReddit });
const store = createStoreWithMiddleware(reducer);

function fetchDataForMyApp(props) {
  const { selectedReddit } = props;
  return fetchPostsIfNeeded(selectedReddit);
}

@provide(store)
@connect(state => state)
class MyApp extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataForMyApp(this.props));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      dispatch(fetchDataForMyApp(nextProps));
    }
  }

  handleChange(nextReddit) {
    this.props.dispatch(selectReddit(nextReddit));
  }

  render () {
    const { selectedReddit, postsByReddit, dispatch } = this.props;
    const posts = postsByReddit[selectedReddit];

    return (
      <div>
        <Picker value={selectedReddit}
                onChange={::this.handleChange}
                options={AVAILABLE_SUBREDDITS} />
        <Posts posts={posts} />
      </div>
    );
  }
}

class Picker extends Component {
  render () {
    const { value, onChange, options } = this.props;

    return (
      <header>
        <h1>{value}</h1>
        <select onChange={e => onChange(e.target.value)}
                value={value}>
          {options.map(option =>
            <option value={option} key={option}>
              {option}
            </option>)
          }
        </select>
      </header>
    );
  }
}

class Posts extends Component {
  render () {
    if (!this.props.posts) {
      return <p>Nothing here yet...</p>;
    } else {
      return this.renderPosts();
    }
  }

  renderPosts () {
    return (
      <ul>
        {this.props.posts.map((post, i) =>
          <li key={i}>{post.data.title}</li>
        )}
      </ul>
    );
  }
}

React.render(
  <MyApp />,
  document.body
);
