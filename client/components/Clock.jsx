import React from 'react';
import styled from 'styled-components';
import {Box, BoxTitle} from './style.jsx';

const Time = styled.span`
    font-size: 30px;
`;

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString()
        };
    }
    componentDidMount() {
        this.intervalId = setInterval(
            () => this.tick(), 1000
        );
    }
    tick() {
        this.setState({
            time: new Date().toLocaleTimeString()
        });
    }
    componentWillUnmount() {
        this.intervalId.clearInterval();
    }
    render() {
        return (
            <Box>
                <BoxTitle>
                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                    <span>Clock</span>
                </BoxTitle>
                <div className="box__body">
                    <Time>{this.state.time}</Time>
                </div>
            </Box>
        );
    }
}