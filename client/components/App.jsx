import React from 'react';
import styled from 'styled-components';
import {userInfo, experiences, projects, skills} from './state.js';

const Box = styled.div`
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
    transform: translate3d(0,0,0);
    transition: 0.3s ease;
    margin-bottom: 20px;
`;
const BoxTitle = styled.h2`
    padding: 20px;
    background-color: #06A763;
    color: #ffffff;
    font-weight: lighter;
`;
const Skill = styled.span`
    background-color: ${props => props.bg};
    padding: 6px;
    color: #ffffff;
    margin-right: 5px;
    font-size: 12px;
    display: inline-block;
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
                        <h4 className="experience__date"><i className="fa fa-calendar" aria-hidden="true"></i>{e.date}</h4>
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
                    <h3 className="project__title"><a className="link" target="_blank" href={p.link}><i className="fa fa-link" aria-hidden="true"></i>{p.name}</a> - <span className="project__type">{p.type}</span></h3>
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
            <div className="container flex-wrap">
                <main id="main">
                    <Box id="basic">
                        <h1>Hey, I am {userInfo.name}</h1>
                        <p>{userInfo.title}</p>
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
            </div>
        );
    }
}