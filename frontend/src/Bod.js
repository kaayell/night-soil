import React, {Component} from 'react'
import {TextField} from "material-ui";
import "./Bod.css"

class Bod extends Component {

    render() {
        return (
            <div className="main_container">
                <TextField floatingLabelText="First Name"/>
                <TextField floatingLabelText="Last Name"/>
                <TextField floatingLabelText="Email"/>
                <TextField floatingLabelText="Hourly Rate"/>
            </div>
        )
    }
}

export default Bod;