import React, {Component} from 'react'
import {AppBar} from "material-ui";
import kawaiipoop from '../kawaii-poop.png'

class Header extends Component {

    render() {
        return (
            <AppBar title={<img alt="poopy" src={kawaiipoop} height="50" width="60"/>}/>
        )
    }
}

export default Header;
