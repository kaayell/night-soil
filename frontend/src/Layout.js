import React, {Component} from 'react';
import './Layout.css';
import Header from './Header.js'
import Bod from "./Bod";

class Layout extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Bod/>
            </div>
        );
    }
}

export default Layout;
