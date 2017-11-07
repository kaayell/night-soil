import React, {Component} from 'react';
import Header from "../Header/Header";
import './Layout.css';
import Timer from "../Timer/Timer";
import BottomNavigation from "../Navigation/Navigation";
import {connect} from "react-redux";
import Home from "../Home/Home";

export class Layout extends Component {
    render() {

        let body
        switch(this.props.activePage){
            case 'timer': body = <Timer />; break;
            default: body = <Home/>; break;
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

export default connect(mapStateToProps)(Layout)
