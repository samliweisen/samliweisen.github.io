import React from 'react';
import {render} from 'react-dom';

import Main from './Main.jsx';

setTimeout(function() {render(
    <Main />,
    document.getElementById('root')
);}, 3000);