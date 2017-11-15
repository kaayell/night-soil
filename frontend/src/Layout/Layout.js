import React, {Component} from 'react';
import {connect} from "react-redux";
import Header from "../Header/Header";
import BottomNavigation from "../Navigation/Navigation";
import Timer from "../Timer/Timer";
import Create from "../Create/Create";
import * as apiClient from "../api/apiClient"

import './Layout.css';
import {setHumanInfo} from "../Human/human-actions";
import Home from "../Home/Home";
import Human from "../Human/Human";


export class Layout extends Component {
    constructor(props) {
        super(props)

        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)
        this.login = this.login.bind(this)
    }

    login() {
        this.props.auth.login();
    }

    handleSuccessfulLogin() {
        const {userProfile, getProfile} = this.props.auth;
        if (!userProfile) {
            getProfile((err, profile) => {
                this.loadOrCreateProfile(profile)
            });
        } else {
            this.loadOrCreateProfile(userProfile)
        }
    }

    loadOrCreateProfile(profile) {
        apiClient.getHuman(profile.email)
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    this.props.setHumanInfo(response.data[0]);
                } else {
                    const humanInfo = {
                        firstName: profile.given_name,
                        lastName: profile.family_name,
                        email: profile.email,
                        hourlyRate: "0"
                    }
                    apiClient.createHuman(humanInfo)
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
            case 'human':
                body = <Human/>
                break;
            default:
                body = <Home/>
                break;
        }

        const {isAuthenticated} = this.props.auth;

        if (!isAuthenticated()) {
            this.login()
            return ""
        }

        this.handleSuccessfulLogin()

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
