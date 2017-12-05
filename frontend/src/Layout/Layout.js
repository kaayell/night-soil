import React, {Component} from 'react';
import {connect} from "react-redux";
import * as apiClient from "../api/apiClient"
import {setHumanInfo} from "../Human/human-actions";
import {Text, View} from "react-native";
import {Container, Content, Header} from "native-base";
import Navigation from "../Navigation/Navigation";
import Home from "../Home/Home";
import Human from "../Human/Human";
import Create from "../Create/Create";
import Timer from "../Timer/Timer";


export class Layout extends Component {
    constructor(props) {
        super(props)

        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)
        this.login = this.login.bind(this)
    }

    login() {
        this.props.auth.loginWithAuth0();
    }

    handleSuccessfulLogin() {
        const {profile} = this.props.auth;
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
            <Container>
                {body}
                <Navigation/>
            </Container>
        )
    }
}


const mapStateToProps = state => {
    return {
        activePage: state.activePage
    }
}

export default connect(mapStateToProps, {setHumanInfo})(Layout)
