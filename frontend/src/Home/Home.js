import React, {Component} from 'react';
// import "./Home.css"
import {connect} from "react-redux";
import {setActivePage} from "../Navigation/navigation-actions";
import * as apiClient from "../api/apiClient"
import {Body, Card, CardItem, Content, Fab, Icon, Text} from "native-base";

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
            <Content style={{flex: 1, flexDirection: 'row', marginTop: 20, width: "100%", backgroundColor: "rgb(248,248,248)"}}>
                <Text>Hi {this.props.humanInfo.firstName}</Text>
                <Card>
                    <CardItem header>
                        <Text>MINUTES POOPING</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Text>{this.state.minutesToDate}</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem header>
                        <Text>MONEY MADE</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Text>{this.state.moneyToDate}</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Fab position={"bottomRight"}
                     onPress={() => this.props.setActivePage("create")}>
                    <Icon name={"add"}/>
                </Fab>
            </Content>

        )
    }

    // render() {
    //     return (
    //         <div className="home-container">
    //             <h2>Hi {this.props.humanInfo.firstName}</h2>
    //             <Card className="stat-card">
    //                 <CardTitle className="stat-header" title={"Minutes Pooping"}/>
    //                 <CardText className="stat">{this.state.minutesToDate}</CardText>
    //             </Card>
    //             <Card className="stat-card">
    //                 <CardTitle className="stat-header" title={"Money Made"}/>
    //                 <CardText className="stat">{this.state.moneyToDate}</CardText>
    //             </Card>
    //             <div className="add-poop-button">
    //                 <FloatingActionButton onClick={() => this.props.setActivePage("create")}>
    //                     <ContentAdd/>
    //                 </FloatingActionButton>
    //             </div>
    //         </div>
    //     )
    // }
}

const mapStateToProps = state => {
    return {
        humanInfo: state.humanInfo
    }
}

export default connect(mapStateToProps, {setActivePage})(Home)