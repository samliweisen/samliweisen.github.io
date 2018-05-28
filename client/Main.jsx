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
        return ([
                <Header key="header" />,
                <Nav key="nav" />,
                <HashRouter key="page">
                    <Switch>
                        <Route exact path='/' component={App} />
                        <Route exact path='/fullpageclock' component={FullPageClock} />
                        <Route path='/todo' component={Todo} />
                        <Route path='/transactions' component={Transaction} />
                        <Route path='/musicplayer' component={MusicPlayer} />
                    </Switch>
                </HashRouter>
                ]
        );
    }
}