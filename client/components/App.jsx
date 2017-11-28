import React from 'react';
import {userInfo, experiences, skills} from './state.js';

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
            return (<div key={i}>
                        <h3>{e.company} - {e.title}</h3>
                        <h4>{e.date}</h4>
                        <ul>
                            {duties}
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
                <div className="columns">
                    <div className="column">
                        <h1>{userInfo.name}</h1>
                        <p>{userInfo.title}</p>
                    </div>
                </div>
                <div className="experiences">
                    <h2>Experiences</h2>
                    {exs}
                </div>
            </div>
        );
    }
}