import React, { PropTypes } from 'react';
import { deleteTodo, completeTodo, toggleEditing, updateText } from 'actions/todos';
import PureComponent from './PureComponent';
import cn from 'classnames';

export default class Todo extends PureComponent {

  static propTypes = {
    todo: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount() {
    console.info('%cToDo mounting- ID: ' + this.props.todo.get('id'), 'color:green; font-weight:bold;');
  }

  componentWillUpdate(nextProps) {
    console.info('%cToDo updating - ID: ' + nextProps.todo.get('id'), 'color:blue; font-weight:bold;');
  }

  componentWillUnmount() {
    console.info('%cToDo unmounting - ID: ' + this.props.todo.get('id'), 'color:orange; font-weight:bold;');
  }

  onTodoInputSubmit() {
    const { id } = this.props.todo.toObject();
    this.props.dispatch(updateText({id, text: this.refs.todoInput.value}))
    this.props.dispatch(toggleEditing(id))
  }

  render() {
    const { id, text, isCompleted, editing } = this.props.todo.toObject();
    const classNames = cn('todo', {
      completed: isCompleted,
    });

    if (editing) {
      return (
        <li className="list-group-item">
          <div className="input-group">
            <input ref="todoInput" type="text" className="form-control" defaultValue={text} />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button" onClick={ () => this.onTodoInputSubmit() }>OK</button>
            </span>
          </div>
        </li>
      )
    } else {
      return (
        <li className="list-group-item">
          <span className={classNames}>
            <input className="todo-checkbox" type="checkbox" checked={isCompleted} onClick={() => this.props.dispatch(completeTodo(id))}/>
            {text}
            <span className="close" onClick={() => this.props.dispatch(deleteTodo(id))}>
              &times;
            </span>
            <span className="close" onClick={() => this.props.dispatch(toggleEditing(id))}>
              edit
            </span>
          </span>
        </li>
      );
    }
  }
}
