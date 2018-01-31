import React from 'react';
import styled from 'styled-components';

import Experiences from './Experiences.jsx';
import Skills from './Skills.jsx';
import Clock from './Clock.jsx';
import Weather from './Weather.jsx';
import {Box, BoxTitle} from './style.jsx';
import {userInfo, projects} from './state.js';

const Container = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
`;

const Link = styled.a`
    color: #000000;
    text-decoration: none;
    transition: 0.3s ease-in;
    &:hover {
        text-decoration: underline;
        color: #06A763;
    }
`;
const Intro = styled.div`
    padding: 20px;
    background-color: #06A763;
    color: #ffffff;
`;

export default class App extends React.Component {
    render() {
        const pros = projects.map((p, i) => {
            const steps = p.steps.map((s, j) => {
                return (
                    <li key={j}>
                        {s}
                    </li>
                );
            });
            return (
                <div className="project" key={i}>
                    <h3 className="project__title">
                        <Link target="_blank" rel="noopener" href={p.link}><i className="fa fa-link" aria-hidden="true"></i>{p.name}</Link> - <span className="project__type">{p.type}</span></h3>
                    <ul>
                        {steps}
                    </ul>
                </div>
            );
        });
        
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
                    <Box className="projects">
                        <BoxTitle>
                            <i className="fa fa-tasks" aria-hidden="true"></i>
                            <span>Projects</span>
                        </BoxTitle>
                        <div className="box__body">
                        {pros}
                        </div>
                    </Box>
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