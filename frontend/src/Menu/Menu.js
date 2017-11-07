import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Drawer, MenuItem} from "material-ui";
import {toggleMenu} from "./menu-actions";

export class Menu extends Component {
    render() {
        return (
            <Drawer open={this.props.menuOpen}
                    docked={false}
                    onRequestChange={this.props.toggleMenu}>
                <MenuItem onClick={this.props.toggleMenu}>Log History</MenuItem>
            </Drawer>
        )
    }
}

const mapStateToProps = state => {
    return {
        menuOpen: state.menuOpen
    }
}
export default connect(mapStateToProps, {toggleMenu})(Menu)