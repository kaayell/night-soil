import React, {Component} from 'react';
import {connect} from "react-redux";
import Header from "../Header/Header";
import BottomNavigation from "../Navigation/Navigation";
import Timer from "../Timer/Timer";
import Home from "../Home/Home";
import Create from "../Create/Create";
import './Layout.css';

export class Layout extends Component {
    render() {

        let body
        switch(this.props.activePage){
            case 'timer': body = <Timer />; break;
            case 'create': body = <Create />; break;
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
