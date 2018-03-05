import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Box, BoxTitle, BoxBody} from './style.jsx';

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
            icon: '',
            loading: true
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
                icon: 'https://openweathermap.org/img/w/' + response.data.weather[0].icon + '.png',
                loading: false
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
            <Box className="col-3">
                <BoxTitle>
                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                    <span>Weather</span>
                </BoxTitle>
                {this.state.loading ?
                <i className="fa fa-spinner loading" aria-hidden="true"></i>
                :
                <BoxBody>
                    <City>{this.state.city}</City>
                    <Temp><img alt="weather-icon" src={this.state.icon} /> {Math.ceil(this.state.temp)} <sup>o</sup>C</Temp>
                </BoxBody>}
            </Box>
        );
    }
}