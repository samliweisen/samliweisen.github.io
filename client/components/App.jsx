import React from 'react';
import styled from 'styled-components';

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

export default class App extends React.Component {
    render() {
        return (
            <Container>
                <main id="main">
                    <Box>
                        <Intro>
                        <h1>Hey, I am {userInfo.name}</h1>
                        <p>{userInfo.title}</p>
                        </Intro>
                    </Box>
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