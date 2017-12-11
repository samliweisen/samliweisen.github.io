import React from 'react';
import {userInfo, experiences, projects, skills} from './state.js';

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
            return (
                <div></div>
            );
        });
        return (
            <div className="container">
                <div className="box" id="basic">
                    <h1>Hey, I am {userInfo.name}</h1>
                    <p>{userInfo.title}</p>
                </div>
                <div className="experiences box">
                    <h2 className="box__title"><i className="fa fa-briefcase" aria-hidden="true"></i>Experiences</h2>
                    <div className="box__body">
                    {exs}
                    </div>
                </div>
                <div className="projects box">
                    <h2 className="box__title"><i className="fa fa-tasks" aria-hidden="true"></i>Projects</h2>
                    <div className="box__body">
                    {pros}
                    </div>
                </div>
            </div>
        );
    }
}