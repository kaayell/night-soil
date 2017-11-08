import React, {Component} from 'react';
import {DatePicker, DropDownMenu, MenuItem, TextField} from "material-ui";
import "./Create.css"

export class Create extends Component {
    render() {
        return (
            <div className="create-container">
                <DropDownMenu
                    className="drop-down"
                    autoWidth={false}
                >
                    <MenuItem value={1} primaryText="1"/>
                </DropDownMenu>
                <TextField floatingLabelText="Duration (minutes)"/>
                <TextField floatingLabelText="Comments"/>
                <DatePicker floatingLabelText="Date"/>
            </div>
        )
    }

}

export default Create