import React, {Component} from 'react';
import {FloatingActionButton} from "material-ui";
import {ContentAdd} from "material-ui/svg-icons/index"
import "./Home.css"
import {connect} from "react-redux";
import {setActivePage} from "../Navigation/navigation-actions";

export class Home extends Component {
    render() {
        return (
            <div className="add-poop-button">
                <FloatingActionButton onClick={() => this.props.setActivePage("create")}>
                    <ContentAdd/>
                </FloatingActionButton>
            </div>
        )
    }
}

export default connect(null, {setActivePage})(Home)