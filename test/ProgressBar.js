import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { ProgressBar, ProgressBarLabel } from '../src/components/ProgressBar/ProgressBar';

describe('ProgressBar', () => {
  let wrapper;
  let processed_actions=10;
  let total_actions=100;

  it('should shallow render itself with proper tags, have default className and appropriate progress bar style', () => {
    const label = 'Commission export';
    wrapper = shallow(<ProgressBar value={processed_actions} denominator={total_actions} label={label} />);

    expect(wrapper.find('div')).to.have.length(3);
    expect(wrapper.first().hasClass('container')).to.equal(true);
    expect(wrapper.first().hasClass('danger')).to.equal(true);

    expect(wrapper.childAt(1).hasClass('outer')).to.equal(true);
    expect(wrapper.childAt(1).childAt(0).hasClass('inner')).to.equal(true);
    expect(wrapper.childAt(1).childAt(0).props().className).to.equal('inner');
    expect(wrapper.childAt(1).childAt(0).props().style.left).to.equal('-90%');

    expect(wrapper.find(ProgressBarLabel)).to.have.length(1);
    expect(wrapper.childAt(0).type()).to.equal(ProgressBarLabel);
    expect(wrapper.childAt(0).props().text).to.equal(label);
    expect(wrapper.childAt(0).props().showPercentage).to.equal(undefined);
    expect(wrapper.childAt(0).props().percentage).to.equal(10);

    processed_actions=100;
    total_actions=100;
    wrapper = shallow(<ProgressBar value={processed_actions} denominator={total_actions} label={label} />);

    expect(wrapper.find('div')).to.have.length(3);
    expect(wrapper.first().hasClass('container')).to.equal(true);
    expect(wrapper.first().hasClass('danger')).to.equal(true);

    expect(wrapper.childAt(1).hasClass('outer')).to.equal(true);
    expect(wrapper.childAt(1).childAt(0).hasClass('inner')).to.equal(true);
    expect(wrapper.childAt(1).childAt(0).props().className).to.equal('inner');
    expect(wrapper.childAt(1).childAt(0).props().style.left).to.equal('0%');

    expect(wrapper.find(ProgressBarLabel)).to.have.length(1);
    expect(wrapper.childAt(0).type()).to.equal(ProgressBarLabel);
    expect(wrapper.childAt(0).props().text).to.equal(label);
    expect(wrapper.childAt(0).props().showPercentage).to.equal(undefined);
    expect(wrapper.childAt(0).props().percentage).to.equal(100);
  });

  it('should not display ProgressBarLabel component', () => {
    wrapper = shallow(<ProgressBar value={processed_actions} denominator={total_actions} />);

    expect(wrapper.find(ProgressBarLabel)).to.have.length(0);
  });
});

describe('ProgressBarLabel', () => {
  let wrapper;
  let showPercentage = true;
  const text = "Ambassador export";
  const percentage = 10;

  it('should shallow render itself with proper tags and show percentage', () => {
    wrapper = shallow(<ProgressBarLabel text={text} showPercentage={showPercentage} percentage={percentage} />);

    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.first().props().className).to.equal('label');
    expect(wrapper.first().hasClass('label')).to.equal(true);
    expect(wrapper.childAt(0).text()).to.equal(text);
    expect(wrapper.first().find('span')).to.have.length(1);
    expect(wrapper.first().children().length).to.equal(2);
    expect(wrapper.childAt(1).props().className).to.equal('percentage');
    expect(wrapper.childAt(1).hasClass('percentage')).to.equal(true);
  });

  it('should shallow render itself with proper tags and show percentage', () => {
    showPercentage = false;
    wrapper = shallow(<ProgressBarLabel text={text} showPercentage={showPercentage} percentage={percentage} />);

    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.first().props().className).to.equal('label');
    expect(wrapper.first().hasClass('label')).to.equal(true);
    expect(wrapper.first().children().length).to.equal(1);
    expect(wrapper.childAt(0).text()).to.equal(text);
    expect(wrapper.first().find('span')).to.have.length(0);
  });
});