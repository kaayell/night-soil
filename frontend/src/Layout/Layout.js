import React, {Component} from 'react';
import {connect} from "react-redux";
import Header from "../Header/Header";
import BottomNavigation from "../Navigation/Navigation";
import Timer from "../Timer/Timer";
import Home from "../Home/Home";
import Create from "../Create/Create";
import * as apiClient from "../api/apiClient"

import './Layout.css';
import GoogleLogin from "react-google-login";
import {setHumanInfo} from "../Human/human-actions";


export class Layout extends Component {
    constructor(props) {
        super(props)

        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)
        this.state = {
            loggedIn: false
        }
    }

    handleSuccessfulLogin(googleResponse) {
        this.setState({loggedIn: true})
        apiClient.getHuman(googleResponse.profileObj.email)
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    this.props.setHumanInfo(response.data[0]);
                } else {
                    const humanInfoFromGoogs = {
                        firstName: googleResponse.profileObj.givenName,
                        lastName: googleResponse.profileObj.familyName,
                        email: googleResponse.profileObj.email,
                        hourlyRate: "0"
                    };
                    apiClient.createHuman(humanInfoFromGoogs)
                        .then((response) => {
                            this.props.setHumanInfo(response.data);
                        })
                }
            })
    }

    render() {
        let body
        switch (this.props.activePage) {
            case 'timer':
                body = <Timer/>;
                break;
            case 'create':
                body = <Create/>;
                break;
            default:
                body = <Home/>;
                break;
        }

        if (!this.state.loggedIn) {
            return (
                <GoogleLogin
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.handleSuccessfulLogin}
                    isSignedIn={true}>
                    <span> Login with Google</span>
                </GoogleLogin>)
        }

        return (
            <div>
                <Header/>
                {body}
                <BottomNavigation/>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        activePage: state.activePage
    }
}

export default connect(mapStateToProps, {setHumanInfo})(Layout)
