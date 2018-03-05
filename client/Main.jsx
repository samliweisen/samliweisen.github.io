import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Clock from './components/Clock.jsx';
import Weather from './components/Weather.jsx';
import App from './components/App.jsx';
import MusicPlayer from './pages/MusicPlayer.jsx';

import {Box, Intro} from './components/style.jsx';
import {userInfo} from './components/state.js';

import './css/resume.css';

export default class Main extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <Box className="col-3">
                        <Intro>
                            <h1>Hey, I am {userInfo.name}</h1>
                            <p>{userInfo.title}</p>
                        </Intro>
                    </Box>
                    <Weather />
                    <Clock />
                </div>
                <HashRouter>
                    <Switch>
                        <Route exact path='/' component={App} />
                        <Route path='/musicplayer/recommend' component={MusicPlayer} />
                        <Route path='/musicplayer/ranking' component={MusicPlayer} />
                        <Route path='/musicplayer/search' component={MusicPlayer} />
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}