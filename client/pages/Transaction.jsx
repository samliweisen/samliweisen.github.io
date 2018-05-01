import React from 'react';
import axios from 'axios';

import '../css/transaction.css';

export default class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction: {
                title: '',
                date: '',
                price: '',
                place: ''
            },
            api: {
                list: 'https://samliweisen.herokuapp.com/api/transactions'
            },
            transactions: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.getList = this.getList.bind(this);
    }
    componentDidMount() {
        this.getList();
    }
    getList() {
        const getListApi = this.state.api.list;
        axios.get(getListApi).then((res) => {
            this.setState({
                transactions: res.data
            });
        });
    }
    handleChange(e) {
        const v = e.target.value;
        const p = e.target.name;
        let t = this.state.transaction;
        t[p] = v;
        this.setState({
            transaction: t
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const postApi = this.state.api.list;
        const transaction = this.state.transaction;
        axios.post(postApi, transaction).then((res) => {
            if (res.status == 200) {
                this.getList();
                this.setState({
                    transation: {
                        title: '',
                        price: '',
                        date: '',
                        place: ''
                    }
                });
            }
        });
    }
    render() {
        const ts = this.state.transactions.map((t) => {
            return (
                <div key={t._id}>
                    {t.title}
                </div>
            );
        });
        const t = this.state.transaction;
        return (
            <section>
                <h1>Transactions</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input placeholder="Title" name="title" value={t.title} onChange={this.handleChange} />
                    <input placeholder="Date" name="date" value={t.date} onChange={this.handleChange} />
                    <input placeholder="Price" name="price" value={t.price} onChange={this.handleChange} />
                    <input placeholder="Place" name="place" value={t.place} onChange={this.handleChange} />
                    <button>Submit</button>
                </form>
                <div className="transaction__list">
                {ts}
                </div>
            </section>
        );
    }
}