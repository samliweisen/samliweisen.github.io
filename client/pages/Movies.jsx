import React from 'react';
import axios from 'axios';

import '../css/movies.css';

export default class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visuals: [],
            api: 'https://what-i-watched.herokuapp.com/api/visuals'
        };
    }
    componentDidMount() {
        this.getVisuals();
    }
    getVisuals() {
        axios.get(this.state.api).then((res) => {
            if (res.status == 200) {
                this.setState({
                    visuals: res.data.results
                });
            }
        });
    }
    render() {
        const visuals = this.state.visuals.map((v) =>
            <div className="visual" key={v.id}>
                <div className="visual__container">
                    <img className="visual__image" src={v.poster} />
                </div>
                <h3 className="visual__title">{v.title}</h3>
            </div>
        );
        return (
            <div className="container">
                <h2>What I Watched</h2>
                <div className="visual__list">
                    {visuals}
                </div>
            </div>
        );
    }
}