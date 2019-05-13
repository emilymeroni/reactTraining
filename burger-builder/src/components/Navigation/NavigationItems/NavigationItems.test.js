import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({ adapter: new Adapter() })

describe('Navigation Items', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />)
  })

  it('renders two navigation items if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2)
  })

  it('renders three navigation items if authenticated', () => {
    wrapper.setProps({
      isAuthenticated: true
    })
    expect(wrapper.find(NavigationItem)).toHaveLength(3)
  })

  it('renders three navigation items if authenticated', () => {
    wrapper.setProps({
      isAuthenticated: true
    })
    expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true)
  })
})