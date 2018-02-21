import React from 'react';
import {Box, BoxTitle, BoxBody} from './style.jsx';
import styled from 'styled-components';

export const NavLink = styled.a`
    color: #06A763;
    text-decoration: none;
    transition: 1s ease-in;
    &:hover {
        text-decoration: underline;
    }
`;

export default class Nav extends React.Component {
    render() {
        return(
            <Box className="experiences">
                <BoxTitle>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                    <span>Navigations</span>
                </BoxTitle>
                <BoxBody>
                    <NavLink href="/vue/#/visuals">What I Watched</NavLink>
                </BoxBody>
            </Box>
        );
    }
}