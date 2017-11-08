import React from 'react'
import {shallow} from 'enzyme'


import FlatButton from 'material-ui/FlatButton'
import Timer from "./Timer"

describe('Timer', () => {
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<Timer/>)
    })

    it('should render', () => {
        expect(wrapper.find('label').text()).toEqual("0:00")
        expect(wrapper.find(FlatButton).at(0).props().label).toEqual("Start")
        expect(wrapper.find(FlatButton).at(1).props().label).toEqual("Reset")
    })

    describe('on click of start timer', () => {
        let startButton;
        beforeEach(()=> {
            jest.useFakeTimers();
            startButton = wrapper.find(FlatButton).at(0);
        })

        it('should start incrementing a state for seconds', () => {
            startButton.simulate('click')

            expect(setInterval.mock.calls.length).toBe(1);
            expect(setInterval.mock.calls[0][1]).toBe(1000);

            jest.runTimersToTime(1000);

            expect(wrapper.state().secondsElapsed).toBe(1)
        })

        it('should format time label into minutes', () => {
            wrapper.setState({secondsElapsed: 80})
            wrapper.rerender()
            expect(wrapper.find('label').text()).toEqual("1:20")
        })

        it('should set state that the timer is not stopped', () => {
            startButton.simulate('click')
            wrapper.rerender()
            expect(wrapper.state().stopTimer).toEqual(false)
        })

        it('should have a stop timer', () => {
            wrapper.setState({secondsElapsed: 80})
            wrapper.rerender()
            expect(wrapper.find(FlatButton).at(0).props().label).toEqual('Stop')
        })
    })

    describe('on click of stop timer', () => {
        let stopButton;
        beforeEach(()=> {
            jest.useFakeTimers();
            wrapper.setState({secondsElapsed: 80})
            wrapper.rerender()

            stopButton = wrapper.find(FlatButton).at(0)
        })

        it('should clear the interval', () => {
            stopButton.simulate('click')
            expect(clearInterval.mock.calls.length).toBe(1);
        })

        it('should display a record button', () => {
            stopButton.simulate('click')
            expect(wrapper.find('label').text()).toEqual("1:20")
            wrapper.rerender()

            expect(wrapper.find(FlatButton).at(2).props().label).toEqual("Record?")
        })

        it('should set state that the timer was stopped', () => {
            stopButton.simulate('click')
            wrapper.rerender()
            expect(wrapper.state().stopTimer).toEqual(true)
        })
    })

    describe('on click of reset timer', () => {
        let resetButton;
        beforeEach(()=> {
            jest.useFakeTimers();
            wrapper.setState({secondsElapsed: 80})
            wrapper.rerender()

            resetButton = wrapper.find(FlatButton).at(1)
        })

        it('should clear seconds', () => {
            resetButton.simulate('click')
            wrapper.rerender()
            expect(wrapper.state().secondsElapsed).toBe(0);
        })

    })
})