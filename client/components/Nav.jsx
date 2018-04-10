import React from 'react';
import {Box, BoxTitle, BoxBody} from './style.jsx';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Navigation = styled.a`
    display: inline-block;
    margin-right: 10px;
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
                    <Navigation href="/#/">Home</Navigation>
                    <Navigation href="/vue/#/visuals">What I Watched</Navigation>
                    <Navigation href="/#/todo">Todos</Navigation>
                </BoxBody>
            </Box>
        );
    }
}