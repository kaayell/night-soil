import React, {Component} from 'react';
import './Layout.css';
import SignUp from "../SignUp/SignUp";
import Menu from "../Menu/Menu";

class Layout extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <SignUp/>
            </div>
        );
    }
}

export default Layout;
