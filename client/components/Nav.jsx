import React from 'react';
import {Box, BoxTitle, BoxBody} from './style.jsx';

export default class Nav extends React.Component {
    render() {
        return(
            <Box className="experiences">
                <BoxTitle>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                    <span>Navigations</span>
                </BoxTitle>
                <BoxBody>
                </BoxBody>
            </Box>
        );
    }
}