import React from 'react';
import { connect } from 'react-redux';

import Experiences from './Experiences.jsx';
import Skills from './Skills.jsx';
import Projects from './Projects.jsx';

import '../css/resume.css';

const App  = ({characters}) => 
    <div className="container">
        <main id="main">
            <Experiences />
            <Projects />
            <ul>
                {characters.map(c => 
                    <li key={c.name}>{c.name}</li>
                )}
            </ul>
        </main>
        <aside id="aside">
            <Skills />
        </aside>
    </div>;
    
const mapStateToProps = ({characters}) => ({
    characters
});

export default connect(mapStateToProps)(App);