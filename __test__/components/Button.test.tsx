import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../src/components/Button/Button';

describe('Button component', () => {
  it('finds Button to be defined', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('button').text()).toEqual('Hello');
  });
});
