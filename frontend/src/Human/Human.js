import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TextField} from "material-ui";
import * as api from "../api/apiClient"
import "./Human.css"
import {setHumanInfo} from "./human-actions";

export class Human extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hourlyRate: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({hourlyRate: nextProps.humanInfo.hourlyRate});
    }

    componentWillUnmount() {
        if (this.props.humanInfo.hourlyRate !== this.state.hourlyRate) {
            let humanInfo = {...this.props.humanInfo, ...this.state}
            api.updateHuman(humanInfo)
            this.props.setHumanInfo(humanInfo)
        }
    }

    onValueChange(field, event) {
        const obj = {};
        obj[field] = event.target.value
        this.setState(obj)
    }

    render() {
        return (
            <div className="main_container">
                <div className="human_form">
                    <TextField floatingLabelText="Name"
                               defaultValue={`${this.props.humanInfo.firstName} ${this.props.humanInfo.lastName}`}
                               disabled={true}/>
                    <TextField floatingLabelText="Email" onChange={this.onValueChange.bind(this, "email")}
                               defaultValue={this.props.humanInfo.email}
                               disabled={true}/>
                    <TextField floatingLabelText="Hourly Rate"
                               onChange={this.onValueChange.bind(this, "hourlyRate")}
                               defaultValue={this.props.humanInfo.hourlyRate}/>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        humanInfo: state.humanInfo
    }
}

export default connect(mapStateToProps, {setHumanInfo})(Human);