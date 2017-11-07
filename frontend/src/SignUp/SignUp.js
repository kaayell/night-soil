import React, {Component} from 'react'
import {connect} from 'react-redux'
import {RaisedButton, TextField} from "material-ui";
import * as api from "../api/apiClient"
import {toggleMenu} from "../Menu/menu-actions"
import "./SignUp.css"

export class SignUp extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
        this.handleMenu = this.handleMenu.bind(this)

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

    handleMenu() {
        this.props.toggleMenu()
    }

    onValueChange(field, event) {
        const obj = {};
        obj[field] = event.target.value
        this.setState(obj)
    }

    render() {
        return (
            <div className="main_container">
                <div className="sign_up_form">
                    <TextField floatingLabelText="First Name"
                               onChange={this.onValueChange.bind(this, "firstName")}/>
                    <TextField floatingLabelText="Last Name" onChange={this.onValueChange.bind(this, "lastName")}/>
                    <TextField floatingLabelText="Email" onChange={this.onValueChange.bind(this, "email")}/>
                    <TextField floatingLabelText="Hourly Rate"
                               onChange={this.onValueChange.bind(this, "hourlyRate")}/>
                    <RaisedButton label="SUBMIT" primary={true} onClick={this.handleClick}/>
                </div>
            </div>
        )
    }
}

export default connect(null, {toggleMenu})(SignUp);