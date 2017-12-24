import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Box, BoxTitle} from './style.jsx';

const Temp = styled.span`
    font-size: 20px;
`;
const City = styled.h3`
    font-size: 30px;
`;

const api = 'https://api.openweathermap.org/data/2.5/weather';


export default class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: '',
            lon:'',
            city: '',
            temp: '',
            icon: ''
        };
    }
    componentDidMount() {
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
                this.fetchWeather(this.state.lat, this.state.lon);
            });
        }
    }
    fetchWeather(lat, lon) {
        axios.get(api, {
            params: {
                appid: '323b480b81057a727bed54d9532159d6',
                lat: lat,
                lon: lon,
                units: 'metric'
            }
        })
        .then((response) => {
            this.setState({
                city: response.data.name,
                temp: response.data.main.temp,
                icon: 'http://openweathermap.org/img/w/' + response.data.weather[0].icon + '.png'
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    componentWillUnmount() {
    }
    render() {
        return (
            <Box>
                <BoxTitle>
                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                    <span>Weather</span>
                </BoxTitle>
                <div className="box__body">
                    <City>{this.state.city}</City>
                    <Temp><img src={this.state.icon} /> {this.state.temp} <sup>o</sup>C</Temp>
                </div>
            </Box>
        );
    }
}