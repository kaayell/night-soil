import React, {Component} from 'react';
import {Provider} from 'react-redux'
import store from "./src/store-index"
import {TabNavigator} from 'react-navigation'
import Home from "./src/Home/Home";
import Human from "./src/Human/Human";
import {Container} from "native-base";
import Layout from "./src/Layout/Layout";

const RootTabs = TabNavigator({
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: 'Home'
            }
        },
        Profile: {
            screen: Human,
            navigationOptions: {
                tabBarLabel: 'Profile'
            }
        }
    }, {
        tabBarPosition: 'bottom',
        animationEnabled: true
    }
)

export default class App extends Component {
    state = {
        fontLoaded: false,
    };

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });

        this.setState({fontLoaded: true})
    }

    render() {
        return (
            this.state.fontLoaded ?
                <Provider store={store}>
                    <Layout/>
                </Provider> : null
        );
    }
}