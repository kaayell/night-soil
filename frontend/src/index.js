import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {MuiThemeProvider} from "material-ui/styles/index";
import Layout from "./Layout/Layout";

const App = () => (
    <MuiThemeProvider>
        <Layout/>
    </MuiThemeProvider>
);

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
