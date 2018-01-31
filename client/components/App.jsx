import React from 'react';

import Experiences from './Experiences.jsx';
import styled from 'styled-components';
import Clock from './Clock.jsx';
import Weather from './Weather.jsx';
import {Box, BoxTitle} from './style.jsx';
import {userInfo, projects, skills} from './state.js';

const Container = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
`;

const Skill = styled.span`
    background-color: ${props => props.bg};
    padding: 6px;
    color: #ffffff;
    margin-right: 5px;
    font-size: 12px;
    display: inline-block;
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
        const sks = skills.map((s, i) => {
            const techs = s.techs.map((t, j) => 
                <Skill bg={t.color} key={j}>{t.name}</Skill>
            );
            return (
                <div className="skills__group" key={i}>
                    <h3 className="skills__title">{s.category}</h3>
                    {techs}
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
                    <Box className="skills">
                        <BoxTitle>
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                            <span>Skills</span>
                        </BoxTitle>
                        <div className="box__body">
                        {sks}
                        </div>
                    </Box>
                </aside>
            </Container>
        );
    }
}