import React, {Component} from 'react'
import {connect} from 'react-redux'
import {AppBar} from "material-ui";
import {toggleMenu} from "../Menu/menu-actions"

export class Header extends Component {
    constructor(props) {
        super(props)
        this.handleMenu = this.handleMenu.bind(this)
    }

    handleMenu() {
        this.props.toggleMenu()
    }

    render(){
        return <AppBar onLeftIconButtonTouchTap={this.handleMenu}/>
    }
}

export default connect(null, {toggleMenu})(Header);