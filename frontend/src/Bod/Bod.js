import React, {Component} from 'react'
import {RaisedButton, TextField} from "material-ui";
import * as api from "../api/apiClient"
import "./Bod.css"

class Bod extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            hourlyRate: ""
        }
    }

    handleClick() {
        api.createHuman(this.state)
    }

    onValueChange(field, event){
        const obj = {};
        obj[field] = event.target.value
        this.setState(obj)
    }

    render() {
        return (
            <div className="main_container">
                <h2>Sign Up</h2>
                <div className="add_human_form">
                    <TextField floatingLabelText="First Name" onChange={this.onValueChange.bind(this, "firstName")}/>
                    <TextField floatingLabelText="Last Name" onChange={this.onValueChange.bind(this, "lastName")}/>
                    <TextField floatingLabelText="Email" onChange={this.onValueChange.bind(this, "email")}/>
                    <TextField floatingLabelText="Hourly Rate" onChange={this.onValueChange.bind(this, "hourlyRate")}/>
                    <RaisedButton label="SUBMIT" primary={true} onClick={this.handleClick}/>
                </div>
            </div>
        )
    }
}

export default Bod;