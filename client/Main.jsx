import React from 'react';
import { HashRouter, Switch, Route, browserHistory  } from 'react-router-dom';

import { createStore, combineReducers } from 'redux';
import { Provider ,connect} from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';


import Header from './components/Header.jsx';
import Nav from './components/Nav.jsx';
import App from './components/App.jsx';
import FullPageClock from './pages/FullPageClock.jsx';
import MusicPlayer from './pages/MusicPlayer.jsx';
import Todo from './pages/Todo.jsx';
import Transaction from './pages/Transaction.jsx';

import './css/resume.css';

const store = createStore(
  combineReducers({
    routing: routerReducer
  })
);

// const history = syncHistoryWithStore(browserHistory, store);
// history.listen(location => analyticsService.track(location.pathname))

export default class Main extends React.Component {
    render() {
        return ([
                <Header key="header" />,
                <Nav key="nav" />,
                <Provider store={store} key="provider">
                <HashRouter key="page">
                    <Switch>
                        <Route exact path='/' component={App} />
                        <Route exact path='/fullpageclock' component={FullPageClock} />
                        <Route path='/todo' component={Todo} />
                        <Route path='/transactions' component={Transaction} />
                        <Route path='/musicplayer' component={MusicPlayer} />
                    </Switch>
                </HashRouter>
                </Provider>
            ]
        );
    }
}