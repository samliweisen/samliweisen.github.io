import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Nav from './components/Nav.jsx';
import App from './components/App.jsx';
import FullPageClock from './pages/FullPageClock.jsx';
import MusicPlayer from './pages/MusicPlayer.jsx';
import Todo from './pages/Todo.jsx';
import Transaction from './pages/Transaction.jsx';

import {Box, Intro} from './components/style.jsx';
import {userInfo} from './components/state.js';

import './css/resume.css';

export default class Main extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Nav />
                <HashRouter>
                    <Switch>
                        <Route exact path='/' component={App} />
                        <Route exact path='/fullpageclock' component={FullPageClock} />
                        <Route path='/todo' component={Todo} />
                        <Route path='/transactions' component={Transaction} />
                        <Route path='/musicplayer/recommend' component={MusicPlayer} />
                        <Route path='/musicplayer/ranking' component={MusicPlayer} />
                        <Route path='/musicplayer/search' component={MusicPlayer} />
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}