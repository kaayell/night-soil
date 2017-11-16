import React, {Component} from 'react';
import {Card, CardText, CardTitle, FloatingActionButton} from "material-ui";
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
        if (nextProps.humanInfo) {
            apiClient.getSummary(nextProps.humanInfo.id)
                .then((response) => {
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
                <Card className="stat-card">
                    <CardTitle className="stat-header" title={"Minutes Pooping"}/>
                    <CardText className="stat">{this.state.minutesToDate}</CardText>
                </Card>
                <Card className="stat-card">
                    <CardTitle className="stat-header" title={"Money Made"}/>
                    <CardText className="stat">{this.state.moneyToDate}</CardText>
                </Card>
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