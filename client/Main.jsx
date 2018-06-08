import React from 'react';
import { HashRouter, Switch, Route, browserHistory  } from 'react-router-dom';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { getCharacters } from './reducer/characters/actions';


import Header from './components/Header.jsx';
import Nav from './components/Nav.jsx';
import App from './components/App.jsx';
import FullPageClock from './pages/FullPageClock.jsx';
import MusicPlayer from './pages/MusicPlayer.jsx';
import Todo from './pages/Todo.jsx';
import Transaction from './pages/Transaction.jsx';

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

store.dispatch(getCharacters());

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