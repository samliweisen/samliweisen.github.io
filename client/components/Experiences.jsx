import React from 'react';
import {experiences} from './state.js';
import {Box, BoxTitle, ExperienceDate} from './style.jsx';

export default class Experiences extends React.Component {
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
        return(
            <Box className="experiences">
                <BoxTitle>
                    <i className="fa fa-briefcase" aria-hidden="true"></i>
                    <span>Experiences</span>
                </BoxTitle>
                <div className="box__body">
                {exs}
                </div>
            </Box>
        );
    }
}