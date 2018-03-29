import React from 'react';
import axios from 'axios';

import '../css/todo.css';

export default class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            newTodo: {
                name: '',
                status: 'pending'
            },
            api: {
                list: 'https://samliweisen.herokuapp.com/api/todos/',
                add: 'https://samliweisen.herokuapp.com/api/todos/',
                update: 'https://samliweisen.herokuapp.com/api/todos/'
            }
        };
        this.submitTodo = this.submitTodo.bind(this);
    }
    componentDidMount() {
        this.getTodos();
    }
    getTodos() {
        axios.get(this.state.api.list).then((res) => {
            if (res.status == 200) {
                this.setState({
                    todos: res.data
                });
            }
        });
    }
    submitTodo() {
        const newTodo = this.state.newTodo;
        axios.post(this.state.api.add, newTodo).then((res) => {
            if (res.status == 200) {
                this.setState({
                    newTodo: {
                        name: '',
                        status: 'pending'
                    }
                });
                this.getTodos();
            }
        });
    }
    updateTodo(todo) {
        axios.put(this.state.api.update + todo._id, todo).then((res) => {
            if (res.status == 200) {
                this.getTodos();
            }
        });
    }
    handleKeyPress(todo, e) {
        if (e.key === 'Enter') {
            if (typeof todo != 'undefined') {
                this.updateTodo(todo);
            } else {
                this.submitTodo();
            }
        }
    }
    handleChange(e) {
        this.setState({
            newTodo: {
                name: e.target.value,
                status: 'pending'
            }
        });  
    }
    handleUpdate(idx, e) {
        const newTodos = this.state.todos.map((todo, i) => {
            if (i !== idx) {
                return todo;
            } else {
                todo.name = e.target.value;
                return todo;   
            }
        });
        this.setState({todos: newTodos});
    }
    getStatus(todo) {
        return 'todo ' + todo.status;
    }
    render() {
        return (
            <div className="container">
                <h2 className="todos__title">Todo</h2>
                <div className="todos__container">
                    <input id="todoName" value={this.state.newTodo.name} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} />
                    {this.state.todos.map((todo, idx) => 
                        <div className={this.getStatus(todo)} key={todo._id}>
                            <div className="todo__status">{todo.status}</div>
                            <input className="todo__title" value={todo.name} onChange={this.handleUpdate.bind(this, idx)} onKeyPress={this.handleKeyPress.bind(this, todo)} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}