import React from 'react';
import styled from 'styled-components';
import Clock from './Clock.jsx';
import Weather from './Weather.jsx';
import {Box, BoxTitle, ExperienceDate} from './style.jsx';
import {userInfo, experiences, projects, skills} from './state.js';

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
        const exs = experiences.map((e, i) => {
            const duties = e.duty.map((d, j) => {
                return (
                    <li key={j}>
                        {d}
                    </li>
                );
            });
            return (<div className="experience" key={i}>
                        <h3>{e.company} - {e.title}</h3>
                        <ExperienceDate><i className="fa fa-calendar" aria-hidden="true"></i>{e.date}</ExperienceDate>
                        <ul>
                            {duties}
                        </ul>
                    </div>
            );
        });
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
                    <Box className="experiences">
                        <BoxTitle>
                            <i className="fa fa-briefcase" aria-hidden="true"></i>
                            <span>Experiences</span>
                        </BoxTitle>
                        <div className="box__body">
                        {exs}
                        </div>
                    </Box>
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