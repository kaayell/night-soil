import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Layout from './Layout';
import {MuiThemeProvider} from "material-ui/styles/index";

const App = () => (
    <MuiThemeProvider>
        <Layout/>
    </MuiThemeProvider>
);

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
