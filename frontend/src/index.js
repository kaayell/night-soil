import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {MuiThemeProvider} from "material-ui/styles/index";
import Layout from "./Layout/Layout";
import {Provider} from 'react-redux'
import store from './store-index'

const App = () => (
    <MuiThemeProvider>
        <Layout/>
    </MuiThemeProvider>
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
