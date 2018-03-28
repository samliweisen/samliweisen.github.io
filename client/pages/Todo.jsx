import React from 'react';
import axios from 'axios';

import '../css/todo.css';

export default class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
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
    render() {
        return (
            <div className="container">
                <h2 className="todos__title">Todo</h2>
                <div className="todos__container">
                    {this.state.todos.map((todo) => 
                        <div className="todo" key={todo._id}>
                            <h3 className="todo__title">{todo.name}</h3>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}