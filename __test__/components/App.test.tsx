import React from 'react';
import { shallow } from 'enzyme';
import App from '../../src/App';

describe('App component', () => {
  it('finds App to be defined', () => {
    const app = shallow(<App />);
    expect(app).toBeDefined();
  });
});
