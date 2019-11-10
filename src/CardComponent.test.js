import React from "react"
import { shallow, mount } from "enzyme"
import CardComponent from "./CardComponent"

describe('CardComponent', () => {
  it('renders correctly', () => {
    shallow(<CardComponent object={{}} index={0} sidesStats={[0, 0]} resourceName='starships' />)
  })

  it('displays players scores', () => {
    let wrapper = mount(<CardComponent object={{}} index={0} sidesStats={[2, 0]} resourceName='starships' />)
    expect(wrapper.find('h5').text()).toEqual('Side 1 (2 points)')
    wrapper = mount(<CardComponent object={{}} index={1} sidesStats={[2, 0]} resourceName='starships' />)
    expect(wrapper.find('h5').text()).toEqual('Side 2 (0 points)')
  })

  it('displays singular form of points', () => {
    let wrapper = mount(<CardComponent object={{}} index={0} sidesStats={[1, 1]} resourceName='starships' />)
    expect(wrapper.find('h5').text()).toEqual('Side 1 (1 point)')
  })

  it('displays starship data', () => {
    const wrapper = mount(
      <CardComponent object={{
          name: 'Star Destroyer',
          starship_class: 'destroyer',
          length: 1500,
          crew: 1000,
          cost_in_credits: 1000000,
          cargo_capacity: 50000,
          consumables: 2000,
          hyperdrive_rating: 5
        }} 
        index={0} 
        sidesStats={[0, 0]} 
        resourceName='starships' />
    )
    const paragraphs = wrapper.find('p')
    expect(paragraphs.at(0).text()).toEqual('Star Destroyer')
    expect(paragraphs.at(1).text()).toEqual('Class: destroyer')
    expect(paragraphs.at(2).text()).toEqual('Length [m]: 1500')
    expect(paragraphs.at(3).text()).toEqual('Crew: 1000')
    expect(paragraphs.at(4).text()).toEqual('Cost [credits]: 1000000')
    expect(paragraphs.at(5).text()).toEqual('Cargo [tonnes]: 50000')
    expect(paragraphs.at(6).text()).toEqual('Consumables: 2000')
    expect(paragraphs.at(7).text()).toEqual('Hyperdrive rating: 5')
  })

  it('displays person data', () => {
    const wrapper = mount(
      <CardComponent object={{
          name: 'Luke Skywalker',
          gender: 'male',
          bigth_year: 1000,
          height: 175,
          mass: 75,
          skin_color: 'white',
          hair_color: 'brown',
          eye_color: 'blue'
        }}
        index={1} 
        sidesStats={[0, 0]} 
        resourceName='people' />
    )
    const paragraphs = wrapper.find('p')
    expect(paragraphs.at(0).text()).toEqual('Luke Skywalker')
    expect(paragraphs.at(1).text()).toEqual('Gender: male')
    expect(paragraphs.at(2).text()).toEqual('Bigth year: 1000')
    expect(paragraphs.at(3).text()).toEqual('Height [cm]: 175')
    expect(paragraphs.at(4).text()).toEqual('Mass [kg]: 75')
    expect(paragraphs.at(5).text()).toEqual('Skin color: white')
    expect(paragraphs.at(6).text()).toEqual('Hair color: brown')
    expect(paragraphs.at(7).text()).toEqual('Eye color: blue')
  })
})
