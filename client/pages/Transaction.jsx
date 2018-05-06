import React from 'react';
import axios from 'axios';

import '../css/transaction.css';

let apiDomain = 'https://samliweisen.herokuapp.com/';
// if (window.location.host.indexOf('a09liweis') > -1) {
//     apiDomain = 'https://samliweisen-a09liweis.c9users.io/';
// }

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
            modal: false,
            api: {
                list: apiDomain + 'api/transactions/',
            },
            transactions: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.getList = this.getList.bind(this);
        this.handleModalChange = this.handleModalChange.bind(this);
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
    handleModal() {
        this.handleModalChange();
    }
    handleModalChange() {
        this.setState({
            modal: !this.state.modal
        });
    }
    handleDelete(t) {
        axios.delete(this.state.api.list + t._id).then((res) => {
            this.getList();
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const postApi = this.state.api.list;
        const transaction = this.state.transaction;
        axios.post(postApi, transaction).then((res) => {
            if (res.status == 200) {
                this.getList();
                this.handleModalChange();
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
            const priceClass = (t.price > 0) ? 'transaction__price debit' : 'transaction__price credit';
            return (
                <div className="transaction__item" key={t._id}>
                    <div className={priceClass}>${Math.abs(t.price)} - {t.title}</div>
                    <div className="transaction__date">{t.date}</div>
                    <span className="transaction__delete fa fa-times" onClick={this.handleDelete.bind(this, t)}></span>
                </div>
            );
        });
        const t = this.state.transaction;
        const modalClass = this.state.modal ? 'modal active' : 'modal';
        return (
            <section id="transactions">
                <h1 className="transactions__title">Transactions</h1>
                <div className={modalClass}>
                    <div className="modal__bg" onClick={this.handleModal.bind(this)}></div>
                    <form className="transaction__form" onSubmit={this.handleSubmit.bind(this)}>
                        <h3>Transaction Form</h3>
                        <input placeholder="Title" name="title" value={t.title} onChange={this.handleChange} />
                        <input placeholder="Date" name="date" value={t.date} onChange={this.handleChange} />
                        <input placeholder="Price" name="price" value={t.price} onChange={this.handleChange} />
                        <input placeholder="Place" name="place" value={t.place} onChange={this.handleChange} />
                        <button>Submit</button>
                    </form>
                </div>
                <a className="transaction__new" onClick={this.handleModal.bind(this)}>+</a>
                <div className="transaction__list">
                {ts}
                </div>
            </section>
        );
    }
}