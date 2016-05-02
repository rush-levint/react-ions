import React from 'react';
import { shallow, mount } from 'enzyme';
import Textarea from '../src/components/Textarea/Textarea';

describe('Textarea', () => {
  let wrapper;

  it('should shallow render itself', () => {
    wrapper = shallow(<Textarea label='Default textarea' name='textarea' value='Initial value.' />);
    expect(wrapper.find('textarea')).to.have.length(1);
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.hasClass('textarea-component')).to.equal(true);
  });

  it('should be disabled', () => {
    wrapper = mount(<Textarea label='Disabled textarea' value='' disabled />);
    expect(wrapper.find('textarea').node.hasAttribute('disabled')).to.equal(true);
  });

  it('should be not have a label', () => {
    wrapper = mount(<Textarea value='' />);
    expect(wrapper.find('label')).to.have.length(0);
  });

  it('should have an extra class', () => {
    wrapper = shallow(<Textarea label='Textarea with error' value='' optClass='textarea-error' />);
    expect(wrapper.hasClass('textarea-component')).to.equal(true);
    expect(wrapper.hasClass('textarea-error')).to.equal(true);
  });

  it('should have state set to an initial value', () => {
    wrapper = shallow(<Textarea label='Textarea with initial value' value='' />);
    wrapper.setState({ value: 'testing' });
    expect(wrapper.childAt(1).props().value).to.equal('testing');
  });

  it.skip('should update the value onChange', () => {
    const initialValue = 'Initial value';
    const afterChange = {target: {value: 'New value'}};
    const handleChange = function(event) {
      wrapper.setState({
        value: event.target.value
      });
    };

    wrapper = mount(<Textarea value='test' onChange={handleChange}></Textarea>);
    expect(wrapper.childAt(1).props().value).not.to.equal(initialValue);

    wrapper.simulate('change', afterChange);
    expect(wrapper.childAt(1).props().value).to.be.equal(newVal);
  });

});
