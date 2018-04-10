import React from 'react';
import styled from 'styled-components';

import { createStore,bindActionCreators } from 'redux';
import { Provider ,connect} from 'react-redux';

import Experiences from './Experiences.jsx';
import Skills from './Skills.jsx';
import Projects from './Projects.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { actions, text} = this.props;
        return (
            <div className="container">
                <main id="main">
                    <Experiences />
                    <Projects />
                </main>
                <aside id="aside">
                    <Skills />
                </aside>
            </div>
        );
    }
}

//action
function changeText(){
    return {
        type:'CHANGE_TEXT'
    };
}

function mapStateToProps(state) {
    return { text: state.text };
}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators({changeText:changeText},dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);