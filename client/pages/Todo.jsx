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
            }
        };
        this.submitTodo = this.submitTodo.bind(this);
    }
    componentDidMount() {
        this.getTodos();
    }
    getTodos() {
        const topListApi = 'https://samliweisen.herokuapp.com/api/todos';
        axios.get(topListApi).then((res) => {
            if (res.status == 200) {
                this.setState({
                    todos: res.data
                });
            }
        });
    }
    submitTodo() {
        const topListApi = 'https://samliweisen.herokuapp.com/api/todos';
        const newTodo = this.state.newTodo;
        axios.post(topListApi, newTodo).then((res) => {
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
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.submitTodo();
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
    render() {
        return (
            <div className="container">
                <h2 className="todos__title">Todo</h2>
                <div className="todos__container">
                    <input id="todoName" value={this.state.newTodo.name} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} />
                    {this.state.todos.map((todo) => 
                        <div className="todo" key={todo._id}>
                            <div className="todo__status">{todo.status}</div>
                            <h3 className="todo__title">{todo.name}</h3>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}