import React from "react";
import { shallow, mount } from "enzyme";
import GameComponent from "./GameComponent";
import { LoaderComponent } from "./HelperComponents";

describe('GameComponent', () => {
  it('renders correctly', () => {
    shallow(<GameComponent />)
  });

  it("displays loader", () => {
    const wrapper = mount(<GameComponent />)
    expect(wrapper.find(LoaderComponent).exists()).toEqual(true);
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
