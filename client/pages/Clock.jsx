import React from 'react';

import '../css/clock.css';

//deadline: new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000)

export default class Clock extends React.Component {
    constructor() {
        super();
        this.state = {
            deadline: new Date(Date.parse(new Date()) + 30 * 60 * 1000)
        };
    }
    componentDidMount() {
        this.countdown();
        // var timeinterval = setInterval(this.countdown(), 1000);
    }
    countdown() {
        var t = Date.parse(this.state.deadline) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    render() {
        return (
            <div className="clock">
                <h2>Time Reminder</h2>
                
            </div>
        );
    }
}