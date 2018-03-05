import React from 'react';
import {render} from 'react-dom';
import { createStore,bindActionCreators } from 'redux';
import { Provider ,connect} from 'react-redux';

import Main from './Main.jsx';

//reducer
const initialState = {
    text: 'Hello'
};
function myApp(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_TEXT':
            return {
                text:state.text=='Hello'?'Stark':'Hello'
            };
        case 'BUTTON_CLICK':
            return {
                text: 'You just click button'
            };
        default:
            return {
                text:'Hello'
            };
    }
}

//store
let store = createStore(myApp);

render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('root')
);