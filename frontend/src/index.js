// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import {Provider} from 'react-redux'
// import store from './store-index'
// import {Router, Route, Switch} from 'react-router-dom'
// import Callback from "./Auth/Callback";
// import {MuiThemeProvider} from "material-ui";
// import Layout from "./Layout/Layout";
// import Auth from "./Auth/Auth"
// import history from "./history"
//
// const auth = new Auth();
//
// const handleAuthentication = (nextState, replace) => {
//     if (/access_token|id_token|error/.test(nextState.location.hash)) {
//         auth.handleAuthentication();
//     }
// }
//
// ReactDOM.render(
//     <Provider store={store}>
//         <Router history={history}>
//             <Switch>
//                 <Route exact={true} path="/" render={(props) => {
//                     return (
//                         <MuiThemeProvider>
//                             <Layout auth={auth} {...props}/>
//                         </MuiThemeProvider>
//                     )
//                 }}/>
//                 <Route exact={true} path="/callback" render={(props) => {
//                     handleAuthentication(props);
//                     return <Callback {...props} />
//                 }}/>
//             </Switch>
//         </Router>
//     </Provider>,
//     document.getElementById('root')
// );
