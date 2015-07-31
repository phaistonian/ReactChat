import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { provide, connect } from 'react-redux';


// Reducer
const initialState = [
  {
    title: 'Store in localstorage and fetch componentDidMount',
    id: 0
  }
];

function todos (state = initialState, action) {
  const { id, title } = action;
  switch (action.type) {
    case 'ADD':
      return [...state, { title, id: state.length + 1}];
    case 'REMOVE':
      return state.filter( todo => todo.id !== id);
    case 'UPDATE':
      return state.map(todo => {
        if (todo.id === id) {
          return {...todo, title};
        }
        return todo;
      });
    case 'MARK':
      return state;
    case 'UNMARK':
      return state;
    default:
      return state;
  }
}


function app (state = {}, action) {
  switch (action.type) {
    case 'EDIT':
      return {...state, editing: action.editing };
    default:
      return state;
  }
}


// actions (actionCreators)
function add (title) {
  return {
    type: 'ADD',
    title: title
  };
}

function remove (id) {
  return {
    type: 'REMOVE',
    id
  };
}

function update (id, title) {
  return {
    type: 'UPDATE',
    id,
    title
  };
}

function edit (id, title) {
  return {
    type: 'EDIT',
    editing: {
      id,
      title
    }
  };
}



// app
const reducer = combineReducers({todos, app});
const store = createStore(reducer);

store.subscribe( () => {
  console.log(store.getState());
});

@provide(store)
@connect(state => ({ todos: state.todos, app: state.app }))
class App extends Component {
  onAdd (title) {
    this.props.dispatch(add(title));
  }

  onUpdate (id, title) {
    edit();
    this.props.dispatch(update(id, title));
  }

  edit (id, title) {
    this.props.dispatch(edit(id, title));
  }


  render () {
    return (
      <div>
        <Header onUpdate={::this.onUpdate} onAdd={::this.onAdd} totalTodos={this.props.todos.length} editing={this.props.app.editing} />
        <Todos todos={this.props.todos } dispatch={this.props.dispatch} edit={::this.edit} />
      </div>
    );
  }
}

class Header extends Component {
  handleSubmit (event) {
    let element = React.findDOMNode(this.refs.input);
    event.preventDefault();

    if (!this.props.editing) {
      this.props.onAdd(element.value.trim());
    } else {
      this.props.onUpdate(element.value.trim());
    }

    element.value = '';
  }

  componentDidMount () {
    React.findDOMNode(this.refs.input).focus();
  }

  render () {
    return (
      <header>
        <h1>My Todo app</h1>
        <h2>Total tods: {this.props.totalTodos}</h2>
        <form onSubmit={::this.handleSubmit}>
          <input
            key={'input-' +  this.props.editing ? 1 : 0 }
            type="text"
            ref="input"
            placeholder="type todo here ..."
            defaultValue={this.props.editing ? this.props.editing.title : null}
          />
        </form>
      </header>
    );
  }
}

class Todos extends Component {
  remove (id) {
    this.props.dispatch(remove(id));
  }

  edit (id, title) {
   this.props.edit(id, title);
  }

  render () {
    return (
      <ul>
        {
          this.props.todos.map(todo =>
            <li key={todo.id}>
              <a href="#" onClick={this.remove.bind(this, todo.id)}>x</a>
              &nbsp;
              <a href="#" onClick={this.edit.bind(this, todo.id, todo.title)}>{todo.title}</a>
            </li>
          )}
      </ul>
    );
  }
}



React.render(<App />, document.body);
