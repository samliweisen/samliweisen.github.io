import React from 'react';
import styled from 'styled-components';

export const NavigationLink = styled.a`
    display: inline-block;
    margin-right: 10px;
    color: #06A763;
    text-decoration: none;
    transition: 1s ease-in;
    font-size: 1.3em;
    &:hover {
        text-decoration: underline;
    }
`;
export const Navigation = styled.nav`
    background-color: #ffffff;
    max-width: 1200px;
    width: 100%;
    margin: auto;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
    margin-bottom: 20px;
    padding: 10px;
`;

export default class Nav extends React.Component {
    render() {
        return(
            <Navigation>
                <NavigationLink href="/#/">Home</NavigationLink>
                <NavigationLink href="/#/todo">Todos</NavigationLink>
                { window.localStorage.getItem('admin') ?
                <NavigationLink href="/#/transactions">Transactions</NavigationLink>
                :null}
            </Navigation>
        );
    }
}