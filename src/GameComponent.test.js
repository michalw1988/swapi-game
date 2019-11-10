import React from "react";
import { shallow, mount } from "enzyme";
import GameComponent from "./GameComponent";

describe('GameComponent', () => {
  it('renders correctly', () => {
    shallow(<GameComponent />)
  });

  it("displays 2 buttons", () => {
    const wrapper = mount(<GameComponent />)
    expect(wrapper.find('button').length).toEqual(2)
  });

  it("initialy sets starships a resource type", () => {
    const wrapper = mount(<GameComponent />)
    expect(wrapper.find('h6').text()).toEqual('STARSHIPS')
  });

  it("can change resource type by clicking the button", () => {
    const wrapper = mount(<GameComponent />);
    const resourceButton = wrapper.find('button#change-resource-button')
    resourceButton.simulate('click')
    expect(wrapper.find('h6').text()).toEqual('PEOPLE')
  });
});
