import React, {Component} from 'react';
import {DatePicker, DropDownMenu, FlatButton, MenuItem, TextField} from "material-ui";
import * as apiClient from "../api/apiClient"
import "./Create.css"
import {connect} from "react-redux";
import {setActivePage} from "../Navigation/navigation-actions";

export class Create extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.onDropDownChange = this.onDropDownChange.bind(this)
        this.onDateChange = this.onDateChange.bind(this)

        this.state = {
            bristolType: null,
            durationInMinutes: null,
            comments: null,
            dateTimeInMilliseconds: null
        }
    }

    handleSubmit() {
        apiClient.createLog({...this.state, ...{humanId: this.props.humanId}})
        this.setState({
            bristolType: null,
            durationInMinutes: null,
            comments: null,
            dateTimeInMilliseconds: null
        })
        this.props.setActivePage("home")
    }

    onDropDownChange(event, index, value) {
        this.setState({bristolType: value})
    }

    onDateChange(event, date) {
        this.setState({dateTimeInMilliseconds: date.getTime()})
    }

    onTextFieldChange(field, event) {
        const obj = {};
        obj[field] = event.target.value
        this.setState(obj)
    }

    render() {
        return (
            <div className="create-container">
                <DropDownMenu
                    value={this.state.bristolType}
                    className="drop-down"
                    autoWidth={false}
                    onChange={this.onDropDownChange}
                >
                    <MenuItem value={1} primaryText="1"/>
                    <MenuItem value={2} primaryText="2"/>
                    <MenuItem value={3} primaryText="3"/>
                    <MenuItem value={4} primaryText="4"/>
                    <MenuItem value={5} primaryText="5"/>
                    <MenuItem value={6} primaryText="6"/>
                    <MenuItem value={7} primaryText="7"/>
                </DropDownMenu>
                <TextField floatingLabelText="Duration (minutes)"
                           onChange={this.onTextFieldChange.bind(this, "durationInMinutes")}/>
                <TextField floatingLabelText="Comments" onChange={this.onTextFieldChange.bind(this, "comments")}/>
                <DatePicker floatingLabelText="Date" onChange={this.onDateChange}/>
                <FlatButton label="Submit" onClick={this.handleSubmit}/>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        humanId: state.humanInfo.id
    }
}

export default connect(mapStateToProps, {setActivePage})(Create)