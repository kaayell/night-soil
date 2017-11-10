import React from 'react';
import {shallow} from 'enzyme'
import Home from "../Home/Home";
import Timer from "../Timer/Timer";
import * as apiClient from "../api/apiClient"

import {Layout} from "./Layout";
import {GoogleLogin} from "react-google-login";

describe('Layout', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(<Layout/>)
    })

    describe('on google login', () => {
        it('has google login component', () => {
            expect(wrapper.find(GoogleLogin).props().isSignedIn).toEqual(true)
        })
    })

    describe('on successful login', () => {
        let googleLoginResponse

        beforeEach(() => {
            googleLoginResponse = {
                profileObj: {
                    email: "me@sup.com",
                    familyName: "sup",
                    givenName: "me"
                }
            }
        })

        it('should render home by default', () => {
            wrapper.setState({loggedIn: true})
            wrapper.rerender()
            expect(wrapper.find(Home).length).toEqual(1)
        })

        it('should render timer page based off state', () => {
            wrapper = shallow(<Layout activePage={"timer"}/>)
            wrapper.setState({loggedIn: true})
            wrapper.rerender()
            expect(wrapper.find(Timer).length).toEqual(1)
        })

        it('should set login state to true', () => {
            wrapper.instance().handleSuccessfulLogin(googleLoginResponse)
            expect(wrapper.state().loggedIn).toEqual(true)
        })

        describe('on retrieving human from api', () => {
            xit('should create human if it receives empty', () => {
                const resolved = new Promise((r) => r(JSON.stringify({data: []})));

                apiClient.createHuman = jest.fn()

                apiClient.getHuman = jest.fn()

                wrapper = shallow(<Layout/>)

                wrapper.instance().handleSuccessfulLogin(googleLoginResponse)
                    .then(() => {
                            expect(apiClient.createHuman)
                                .toHaveBeenCalledWith({
                                    email: "me@sup.com",
                                    firstName: "me",
                                    lastName: "sup",
                                    hourlyRate: "0"
                                })
                        }
                    )
            })
        })


    })
})

