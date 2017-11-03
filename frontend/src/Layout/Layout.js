import React, {Component} from 'react';
import './Layout.css';
import Header from "../Header/Header";
import Bod from "../Bod/Bod";

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
