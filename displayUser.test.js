/**
 * @jest-environment node
 */


import React from 'react';
import { shallow, mount, render } from 'enzyme';

import FriendsView  from './src/components/views/FriendsView.js';

describe('Display Users Component', () => {
    it('gets users from DB', () => {
        const wrapper = shallow(<FriendsView/>)
        // shallow copy displayUser
        const buttonTestState = wrapper.find('button.show_user')
        //in component access the button element with the deleteButton class 
        buttonTestState.simulate('click')
        // simulate clicking deleteButton
        const newUserState = wrapper.state().addNewUser
        //access state.users array
        setTimeout(()=>{
            expect(newUserState).toBe('ADD NEW FRIEND')
            //testing array for length, if array.length===0 then function did not run correctly
            //getting: unexpected token Import in setup.js
        },0)

        // const userState = wrapper.find/////////////////////////search for component because delete button is rendered in DisplayUser/////////////////////////////        expect(userState).toBeGreaterThan(0)
    })
})



// about to write test function for function that is ran on click of get New User, only button in FriendsView