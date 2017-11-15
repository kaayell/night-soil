import React, {Component} from 'react';
import {FloatingActionButton} from "material-ui";
import {ContentAdd} from "material-ui/svg-icons/index"
import "./Home.css"
import {connect} from "react-redux";
import {setActivePage} from "../Navigation/navigation-actions";
import * as apiClient from "../api/apiClient"

export class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            minutesToDate: 0,
            moneyToDate: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.humanInfo)
        if (nextProps.humanInfo) {
            apiClient.getSummary(nextProps.humanInfo.id)
                .then((response) => {
                console.log(response)
                    if (response.data) {
                        this.setState({
                            minutesToDate: response.data.minutesToDate,
                            moneyToDate: response.data.moneyToDate
                        })
                    }
                })
        }
    }

    render() {
        return (
            <div className="home-container">
                <h2>Hi {this.props.humanInfo.firstName}</h2>
                <div>Minutes Spent Pooping: {this.state.minutesToDate}</div>
                <div>Money Made While Pooping: {this.state.moneyToDate}</div>
                <div className="add-poop-button">
                    <FloatingActionButton onClick={() => this.props.setActivePage("create")}>
                        <ContentAdd/>
                    </FloatingActionButton>
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

export default connect(mapStateToProps, {setActivePage})(Home)