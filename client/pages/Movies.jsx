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
        const visuals = this.state.visuals.map((v) => {
            let status;
            if (v.current_episode == v.episodes) {
                status = 'done';
            }
            if (v.current_episode < v.episodes) {
                status = 'in_progress';
                if (v.current_episode == 0) {
                    status = 'not_started';
                }
            }
            status += ' visual__container';
            
            return (
                <div className="visual" key={v.id}>
                    <div className={status}>
                        <img className="visual__image" src={v.poster} />
                        <div className="visual__detail">
                            <h3 className="visual__title">{v.title}</h3>
                        </div>
                    </div>
                </div>
            );
        }
        );
        return (
            <div className="container">
                <h2 className="visuals__title">What I Watched</h2>
                <div className="visual__list">
                    {visuals}
                </div>
            </div>
        );
    }
}