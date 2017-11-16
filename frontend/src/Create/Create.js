import React, {Component} from 'react';
import {DatePicker, FlatButton, MenuItem, SelectField, TextField} from "material-ui";
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
            dateTimeInMilliseconds: null,

            errorTexts: {
                bristolTypeErrorText: "",
                durationInMinutesErrorText: "",
                commentsErrorText: "",
                dateTimeInMillisecondsErrorText: ""
            }
        }
    }

    handleSubmit() {
        let errorTexts = {}
        Object.entries(this.state).forEach(([key, value]) => {
            if (value === null) {
                errorTexts[`${key}ErrorText`] = "This field is required"
            }
        })

        if (Object.keys(errorTexts).length !== 0) {
            this.setState({errorTexts: {...this.state.errorTexts, ...errorTexts}})
            return
        }

        apiClient.createLog({...this.state, ...{humanId: this.props.humanId}})
        this.props.setActivePage("home")
    }

    onDropDownChange(event, index, value) {
        this.setState({bristolType: value,
            errorTexts: {...this.state.errorTexts, ...{bristolTypeErrorText: ""}}})
    }

    onDateChange(event, date) {
        this.setState({dateTimeInMilliseconds: date.getTime(),
            errorTexts: {...this.state.errorTexts, ...{dateTimeInMillisecondsErrorText: ""}}})
    }

    onTextFieldChange(field, event) {
        const errorObj = {}
        errorObj[`${field}ErrorText`] = ""
        const obj = {};
        obj[field] = event.target.value === "" ? null : event.target.value
        obj['errorTexts'] = {...this.state.errorTexts, ...errorObj}
        this.setState(obj)
    }

    render() {
        return (
            <div className="create-container">
                <SelectField
                    floatingLabelText="Bristol Type"
                    value={this.state.bristolType}
                    onChange={this.onDropDownChange}
                    autoWidth={true}
                    errorText={this.state.errorTexts.bristolTypeErrorText}
                >
                    <MenuItem value={1} primaryText="1 (Separate hard lumps)"/>
                    <MenuItem value={2} primaryText="2 (Lumpy and sausage like)"/>
                    <MenuItem value={3} primaryText="3 (Cracked sausage shape)"/>
                    <MenuItem value={4} primaryText="4 (Smooth sausage)"/>
                    <MenuItem value={5} primaryText="5 (Soft blobs with clear edges)"/>
                    <MenuItem value={6} primaryText="6 (Mushy with ragged edges)"/>
                    <MenuItem value={7} primaryText="7 (Liquid)"/>
                </SelectField>
                <TextField floatingLabelText="Duration (minutes)"
                           onChange={this.onTextFieldChange.bind(this, "durationInMinutes")}
                           errorText={this.state.errorTexts.durationInMinutesErrorText}
                />
                <TextField floatingLabelText="Comments"
                           onChange={this.onTextFieldChange.bind(this, "comments")}
                           errorText={this.state.errorTexts.commentsErrorText}
                />
                <DatePicker floatingLabelText="Date"
                            onChange={this.onDateChange}
                            errorText={this.state.errorTexts.dateTimeInMillisecondsErrorText}
                />
                <FlatButton label="Add my poop!" onClick={this.handleSubmit}/>
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