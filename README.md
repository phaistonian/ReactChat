# To copy from source
`git clone Boilerplate MY_PROJECT && cd MY_PROJECT && rm -rf .git`


## tools

## deploy

## guides

## watchpack
- *SOS* When web packing does not take place, try webpack again (run it)
- http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup

## ES6
- https://github.com/lukehoban/es6features#math--number--string--array--object-apis
- http://cl.ly/image/41121J2n130g - http://d.pr/i/tl3e
- https://hacks.mozilla.org/2015/07/es6-in-depth-classes/?utm_source=javascriptweekly&utm_medium=email

## ES7
- {a, b, ...rest} = {a:1, b:2, c:3, d:4}  //ES7
- Object.observe
- https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841
- https://github.com/zenparsing/es-function-bind (strawman)

## REACT
- https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
- http://davidandsuzi.com/what-we-can-learn-from-react/
- https://reactjsnews.com/react-style-guide-patterns-i-like/
- http://d.pr/i/1e5ir [tip]
- http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio/ [video]
- https://egghead.io/lessons/react-react-in-7-minutes [video]
- http://racingtadpole.com/blog/flux-react-best-practices/
- https://github.com/emmenko/redux-react-router-async-example

## REACT libs
- https://github.com/gpbl/react-day-picker

## REDUX - MAJOR
- https://github.com/gaearon/redux/blob/rewrite-docs/docs/Reference/Glossary.md ****SUPER***

- https://github.com/gaearon/redux

## REDUX 1.0 (rc)
- https://github.com/gaearon/redux/releases/tag/v1.0.0-rc
- npm install --save redux@1.0.0-rc
- npm install --save react-redux
- createRedux -> createStore
- provider store= instead of provider redux=

## REDUX Glossary
- Actions are payloads of informations ( { type, .. })
- ActionCreatores are functions that return actions
- Reducers are functions that handle states (previousState, action) => new State

## REDUX WORKFLOW
1. Define (/constants) actionTypes
2. Define (/actions) actions (actioncreators)
3. Define (/reducers)


## Setup provider on parent
myStore = createStore(reducers);
@provide(store)`

This should go to topmost class to intercept stuff
@connect(state => ({ todos: state.todos }))
they are passed as props  (this.propsyes )





## REDUX API

https://github.com/gaearon/redux/blob/rewrite-docs/docs/Reference/API.md ****SUPER***

### STORE API
- createStore (reducer, initialState): store
- getState()
- dispatch(action)
- subscribe(listener)
- getReducer()
- replaceReducer(nextReduce)

- combineReducers(reducers: object)
- applyMiddleWare(...middlewares)
- bindActionCreators(actionCreators, dispatcch)

`let boundActionCreators = bindActionCreators(actionCreators, store.dispatch);
boundActionCreators.addTodo('Use Redux');`

- commpose(functions)

## REDUX PROVIDER CONNECTOR
- ALWAYS USE DECORATORS http://d.pr/i/1bPuH (check todo app)


## Redux
- http://davidandsuzi.com/writing-a-basic-app-in-redux/
- https://github.com/gaearon/redux/blob/rewrite-docs/docs/Reference/API.md
- https://github.com/gaearon/redux#simple-examples
- https://github.com/gaearon/redux/tree/rewrite-docs
- https://github.com/quangbuule/redux-example
- https://github.com/gaearon/redux/blob/rewrite-docs/docs/Reference/Glossary.md (glossary)

## Misc
- http://jakearchibald.com/2015/thats-so-fetch/
- https://github.com/rwaldron/idiomatic.js/blob/master/readme.md
- http://cycle.js.org/
- https://github.com/gaearon/normalizr
- editoconfig.org

## blind spots
- use tests?
- use eslint?

## CSS

### misc rules
- Animate everything

### global
- loading (data-loading)

### Vars

* $input-border-radius
* $input-padding
* $input-hover-color-pct


# projects
- https://github.com/fdecampredon/rx-flux
- https://github.com/Reactive-Extensions/RxJS
- http://leafletjs.com/reference.html#map-options


# Articles and posts
- https://madebymany.com/blog/beyond-the-to-do-app-writing-complex-applications-using-flux-react-js (must read)
- http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio/

# normalizr
- https://www.youtube.com/watch?v=I7IdS-PbEgI&app=desktop

# NODE
- https://github.com/acdlite/flummox/blob/master/docs/src/scripts/build-static-site.js

# Testing
- https://travis-ci.org/
- http://karma-runner.github.io/0.13/index.html

## NEW STUFF TO CHECK
- https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
- http://leaverou.github.io/stretchy/



## Lifecycle

### componentWillMount
Invoked once, both on the client and server, immediately before the initial rendering occurs. If you call setState within this method, render() will see the updated state and will be executed only once despite the state change.

### componentDidMount
Invoked once, only on the client (not on the server), immediately after the initial rendering occurs. At this point in the lifecycle, the component has a DOM representation which you can access via React.findDOMNode(this).

If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval, or send AJAX requests, perform those operations in this method.

### componentWillReceiveProps
Invoked when a component is receiving new props. This method is not called for the initial render.

Use this as an opportunity to react to a prop transition before render() is called by updating the state using this.setState(). The old props can be accessed via this.props. Calling this.setState() within this function will not trigger an additional render.

### shouldComponentUpdate
Invoked before rendering when new props or state are being received. This method is not called for the initial render or when forceUpdate is used.

Use this as an opportunity to return false when you’re certain that the transition to the new props and state will not require a component update.

### componentWillUpdate
Invoked immediately before rendering when new props or state are being received. This method is not called for the initial render.

Use this as an opportunity to perform preparation before an update occurs.

### componentDidUpdate
Invoked immediately after the component’s updates are flushed to the DOM. This method is not called for the initial render.

Use this as an opportunity to operate on the DOM when the component has been updated.

### componentWillUnmount
Invoked immediately after the component’s updates are flushed to the DOM. This method is not called for the initial render.

Use this as an opportunity to operate on the DOM when the component has been updated


## AMAZING
- https://github.com/faassen/reselect
