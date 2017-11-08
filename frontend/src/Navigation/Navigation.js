import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem, Paper} from "material-ui";
import {AddCircle, Alarm, Home} from "material-ui-icons";
import "./Navigation.css"
import {connect} from "react-redux";
import {setActivePage} from "./navigation-actions";

export class Navigation extends Component {
    render() {
        return (
            <Paper zDepth={1} className="bottom-nav">
                <BottomNavigation>
                    <BottomNavigationItem
                        label="Home"
                        icon={<Home/>}
                        onClick={() => this.props.setActivePage("home")}
                    />
                    <BottomNavigationItem
                        label="Time Poop"
                        icon={<Alarm/>}
                        onClick={() => this.props.setActivePage("timer")}
                    />
                    <BottomNavigationItem
                        label="Add Poop"
                        icon={<AddCircle/>}
                        onClick={() => this.props.setActivePage("create")}
                    />
                </BottomNavigation>
            </Paper>
        )
    }
}

export default connect(null, {setActivePage})(Navigation);