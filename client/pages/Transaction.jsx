import React from 'react';
import axios from 'axios';
import flatpickr from "flatpickr";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import 'flatpickr/dist/themes/material_green.css';
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
                category: '',
                place: {}
            },
            address: '',
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
        flatpickr('#date', {
            dateFormat: 'Y-m-d',
            disableMobile: 'true'
        });
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
    handleSelectAddress(address) {
        geocodeByAddress(address)
            .then(results => {
                const place = {
                    name: address,
                    place_id: results[0].place_id,
                    address: results[0].formatted_address,
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng(),
                };
                let t = this.state.transaction;
                t.place = place;
                this.setState({
                    transaction: t
                });
            })
            .catch(error => console.error('Error', error));
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
    handleUpdate(t) {
        this.setState({
            transaction: t
        });
        this.handleModalChange();
    }
    handleSubmit(e) {
        e.preventDefault();
        const postApi = this.state.api.list;
        const transaction = this.state.transaction;
        if (typeof transaction._id == 'undefined') {
            axios.post(postApi, transaction).then((res) => {
                if (res.status == 200) {
                    this.getList();
                    this.handleModalChange();
                    this.setState({
                        transation: {
                            title: '',
                            price: '',
                            date: '',
                            place: {}
                        }
                    });
                }
            });
        } else {
            axios.put(postApi + transaction._id, transaction).then((res) => {
                if (res.status == 200) {
                    this.getList();
                    this.handleModalChange();
                    this.setState({
                        transation: {
                            title: '',
                            price: '',
                            date: '',
                            place: {}
                        }
                    });
                }
            });
        }
    }
    render() {
        const ts = this.state.transactions.map((t) => {
            const priceClass = (t.price > 0) ? 'transaction__price debit' : 'transaction__price credit';
            return (
                <div className="transaction__item" key={t._id}>
                    <div className={priceClass}>${Math.abs(t.price)} - {t.title}</div>
                    <div className="transaction__date">{t.date}</div>
                    <span onClick={this.handleUpdate.bind(this, t)}>Edit</span>
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
                        <input placeholder="Date" id="date" name="date" value={t.date} onChange={this.handleChange} />
                        <input placeholder="Price" name="price" value={t.price} onChange={this.handleChange} />
                        <input placeholder="Category" name="category" value={t.category} onChange={this.handleChange} />
                        <PlacesAutocomplete value={this.state.address} onChange={value => this.setState({address: value}) } onSelect={this.handleSelectAddress.bind(this)}>
                            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                            <div>
                                <input
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input'
                                    })}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                        <div {...getSuggestionItemProps(suggestion, { className, style })}>
                                            <span>{suggestion.description}</span>
                                        </div>
                                        );
                                    })}
                                </div>
                            </div>
                            )}
                        </PlacesAutocomplete>
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