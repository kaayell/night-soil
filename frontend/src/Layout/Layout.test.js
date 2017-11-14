import React from 'react';
import {shallow} from 'enzyme'
import Home from "../Home/Home";
import Timer from "../Timer/Timer";
import * as apiClient from "../api/apiClient"

import {Layout} from "./Layout";

describe('Layout', () => {
    let wrapper

    describe('on successful login', () => {
        let auth0Response
        let auth

        beforeEach(() => {
            auth0Response = {
                email: "me@sup.com",
                family_name: "sup",
                given_name: "me"
            }
            auth = {
                userProfile: auth0Response,
                isAuthenticated: () => true,
                getProfile: jest.fn(),
                login: jest.fn()
            }
            wrapper = shallow(<Layout auth={auth}/>)

        })

        it('should render home by default', () => {
            expect(wrapper.find(Home).length).toEqual(1)
        })

        it('should render timer page based off state', () => {
            wrapper = shallow(<Layout activePage={"timer"} auth={auth}/>)
            expect(wrapper.find(Timer).length).toEqual(1)
        })

        xit('should call get human', () => {
            apiClient.getHuman = jest.fn()

            wrapper.instance().handleSuccessfulLogin()
            expect(apiClient.getHuman).toHaveBeenCalledWith("me@sup.com")
        })

        describe('on retrieving human from api', () => {
            xit('should create human if it receives empty', () => {
                const resolved = new Promise((r) => r(JSON.stringify({data: []})));

                apiClient.createHuman = jest.fn()

                apiClient.getHuman = jest.fn()

                wrapper = shallow(<Layout auth={auth}/>)

                wrapper.instance().handleSuccessfulLogin(auth0Response)
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

