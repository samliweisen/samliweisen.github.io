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
            loading: false,
            api: {
                list: 'https://samliweisen.herokuapp.com/api/todos/',
                add: 'https://samliweisen.herokuapp.com/api/todos/',
                update: 'https://samliweisen.herokuapp.com/api/todos/',
                remove: 'https://samliweisen.herokuapp.com/api/todos/'
            }
        };
        this.submitTodo = this.submitTodo.bind(this);
    }
    componentDidMount() {
        this.getTodos();
    }
    getTodos() {
        this.setState({
            loading: true
        });
        axios.get(this.state.api.list).then((res) => {
            if (res.status == 200) {
                this.setState({
                    loading: false,
                    todos: res.data
                });
            }
        });
    }
    submitTodo() {
        const newTodo = this.state.newTodo;
        axios.post(this.state.api.add, newTodo).then((res) => {
            if (res.status == 200) {
                const todo = res.data;
                let todos = this.state.todos;
                todos.unshift(todo);
                this.setState({
                    newTodo: {
                        name: '',
                        status: 'pending'
                    },
                    todos: todos
                });
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
            if (todo != 'add') {
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
    handleComplete(idx) {
        let todos = this.state.todos;
        todos[idx].status = 'done';
        let todo = todos[idx];
        axios.put(this.state.api.update + todo._id, todo).then((res) => {
            if (res.status == 200) {
                this.setState({
                    todos: todos
                });
            }
        });
    }
    handleRemove(idx, id) {
        axios.delete(this.state.api.remove + id).then((res) => {
            if (res.status == 200) {
                let todos = this.state.todos;
                todos.splice(idx, 1);
                this.setState({
                    todos: todos
                });
            }
        });
    }
    getStatus(todo) {
        return 'todo ' + todo.status;
    }
    render() {
        const todoList = this.state.todos.map((todo, idx) => 
                        <div className={this.getStatus(todo)} key={todo._id}>
                            <div className="todo__status">{todo.status} <span className="todo__complete" onClick={this.handleComplete.bind(this, idx)}>Mark Complete</span></div>
                            <input className="todo__title" value={todo.name} onChange={this.handleUpdate.bind(this, idx)} onKeyPress={this.handleKeyPress.bind(this, todo)} />
                            <div className="todo__remove" onClick={this.handleRemove.bind(this, idx, todo._id)}>Remove</div>
                        </div>
                    );
        return (
            <div className="container">
                <h2 className="todos__title">Todo</h2>
                <div className="todos__container">
                    <input id="todoName" value={this.state.newTodo.name} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this, 'add')} />
                    {this.state.loading ? 
                        <div className="loader"></div>
                        :
                        todoList}
                </div>
            </div>
        );
    }
}