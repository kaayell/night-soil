import React, {Component} from 'react';
import {connect} from "react-redux";
import {setActivePage} from "./navigation-actions";
import {Button, Footer, FooterTab, Icon} from "native-base";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export class Navigation extends Component {
    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button vertical onPress={() => this.props.setActivePage("home")}>
                        <MaterialIcons name="home" size={30} color={"white"}/>
                    </Button>
                    <Button vertical onPress={() => this.props.setActivePage("timer")}>
                        <MaterialIcons name="timer" size={30} color={"white"}/>
                    </Button>
                    <Button vertical onPress={() => this.props.setActivePage("human")}>
                        <SimpleLineIcons name="user" size={30} color={"white"}/>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}

export default connect(null, {setActivePage})(Navigation);