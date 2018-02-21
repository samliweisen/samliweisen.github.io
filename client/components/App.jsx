import React from 'react';
import styled from 'styled-components';

import { createStore,bindActionCreators } from 'redux';
import { Provider ,connect} from 'react-redux';

import Nav from './Nav.jsx';
import Experiences from './Experiences.jsx';
import Skills from './Skills.jsx';
import Projects from './Projects.jsx';
import Clock from './Clock.jsx';
import Weather from './Weather.jsx';
import {Box} from './style.jsx';
import {userInfo} from './state.js';

const Container = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
`;
const Intro = styled.div`
    padding: 20px;
    background-color: #06A763;
    color: #ffffff;
`;

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { actions, text} = this.props;
        return (
            <Container>
                <main id="main">
                    <Box>
                        <Intro>
                        <h1><span onClick={actions.changeText}>{text}</span>, I am {userInfo.name}</h1>
                        <p>{userInfo.title}</p>
                        </Intro>
                    </Box>
                    <Nav />
                    <Experiences />
                    <Projects />
                </main>
                <aside id="aside">
                    <Weather />
                    <Clock />
                    <Skills />
                </aside>
            </Container>
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