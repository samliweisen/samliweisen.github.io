import React from 'react';

import Experiences from './Experiences.jsx';
import Skills from './Skills.jsx';
import Projects from './Projects.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container">
                <main id="main">
                    <Experiences />
                    <Projects />
                </main>
                <aside id="aside">
                    <Skills />
                </aside>
            </div>
        );
    }
}