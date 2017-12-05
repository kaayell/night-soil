import {AUTH_CONFIG} from './secrets';
import {AuthSession} from "expo";
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({domain: AUTH_CONFIG.domain, clientId: AUTH_CONFIG.clientId});

function toQueryString(params) {
    return '?' + Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

export default class Auth {

    constructor() {
        this.loginWithAuth0 = this.loginWithAuth0.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
    }


    loginWithAuth0 = async () => {
        const redirectUrl = AuthSession.getRedirectUrl();
        const result = await AuthSession.startAsync({
            authUrl: `${AUTH_CONFIG.domain}/authorize` + toQueryString({
                client_id: AUTH_CONFIG.clientId,
                response_type: 'token',
                scope: 'openid profile email',
                redirect_uri: redirectUrl,
            }),
        });

        if (result.type === 'success') {
            console.log(result.params)
            auth0
                .auth
                .userInfo({token: result.params.access_token})
                .then((response) => {
                    this.userProfile = response
                })
                .catch(console.error);
        }
    }

    setSession(authResult) {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    getAccessToken() {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('No access token found');
        }
        return accessToken;
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}