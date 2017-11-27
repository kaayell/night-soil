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
import { AuthSession } from 'expo';

const auth0ClientId = 'U4IZAovglJbFOek8uNTzJgk7CpazQSdB';
const auth0Domain = 'https://poop.auth0.com';

function toQueryString(params) {
    return '?' + Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}


export class Layout extends Component {
    constructor(props) {
        super(props)

        // this._loginWithAuth0 = this._loginWithAuth0.bind(this)
        // this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)
        // this.login = this.login.bind(this)
    }

    // login() {
    //     this.props.auth.login();
    // }
    //
    // handleSuccessfulLogin() {
    //     const {userProfile, getProfile} = this.props.auth;
    //     if (!userProfile) {
    //         getProfile((err, profile) => {
    //             this.loadOrCreateProfile(profile)
    //         });
    //     } else {
    //         this.loadOrCreateProfile(userProfile)
    //     }
    // }
    //
    // loadOrCreateProfile(profile) {
    //     apiClient.setHeader(this.props.auth.getAccessToken())
    //     apiClient.getHuman(profile.email)
    //         .then((response) => {
    //             if (response.data && response.data.length > 0) {
    //                 this.props.setHumanInfo(response.data[0]);
    //             } else {
    //                 const humanInfo = {
    //                     firstName: profile.given_name,
    //                     lastName: profile.family_name,
    //                     email: profile.email,
    //                     hourlyRate: "0"
    //                 }
    //                 apiClient.createHuman(humanInfo)
    //                     .then((response) => {
    //                         this.props.setHumanInfo(response.data);
    //                     })
    //             }
    //         })
    // }


    _loginWithAuth0 = async () => {
        const redirectUrl = AuthSession.getRedirectUrl();
        const result = await AuthSession.startAsync({
            authUrl: `${auth0Domain}/authorize` + toQueryString({
                client_id: auth0ClientId,
                response_type: 'token',
                scope: 'openid profile email',
                redirect_uri: redirectUrl,
            }),
        });

        console.log(result);
        if (result.type === 'success') {
            this.handleParams(result.params);
        }
    }

    handleParams = (responseObj) => {
        console.log(responseObj)
        // const encodedToken = responseObj.id_token;
        // const decodedToken = jwtDecoder(encodedToken);
        // const username = decodedToken.name;
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

        // const {isAuthenticated} = this.props.auth;
        //
        // if (!isAuthenticated()) {
        //     this._loginWithAuth0()
        //     return ""
        // }

        this._loginWithAuth0()
        // this.handleSuccessfulLogin()

        // return (
        //     <div>
        //         {body}
        //         <BottomNavigation/>
        //     </div>
        // );

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
