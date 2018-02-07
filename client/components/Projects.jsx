import React from 'react';
import styled from 'styled-components';

import {projects} from './state.js';
import {Box, BoxTitle, BoxBody} from './style.jsx';

const Link = styled.a`
    color: #000000;
    text-decoration: none;
    transition: 0.3s ease-in;
    &:hover {
        text-decoration: underline;
        color: #06A763;
    }
`;

export default class Projects extends React.Component {
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
        return(
            <Box className="projects">
                <BoxTitle>
                    <i className="fa fa-tasks" aria-hidden="true"></i>
                    <span>Projects</span>
                </BoxTitle>
                <BoxBody>
                {pros}
                </BoxBody>
            </Box>
        );
    }
}