import React from 'react';
import { shallow } from 'enzyme';

import Breadcrumb from '../Breadcrumb';

describe('<Breadcrumb />', () => {
  let mounted = null;
  const child = <a href="/" key="id-1">foobar</a>;

  beforeEach(() => {
    mounted = shallow(<Breadcrumb>{child}</Breadcrumb>);
  });

  it('renders the correct markup', () => {
    expect(mounted.find('nav > .slds-breadcrumb').length).toBe(1);
  });

  it('renders a single child', () => {
    expect(mounted.find('li.slds-breadcrumb__item').contains(child)).toBeTruthy();
  });

  it('renders multiple children', () => {
    const children = [
      <a href="/" key="id-1">foobar</a>,
      <a href="/" key="id-2">foobar2</a>,
    ];
    mounted.setProps({ children });

    const lis = mounted.find('li.slds-breadcrumb__item');
    expect(lis.length).toEqual(2);
    expect(lis.first().contains(children[0])).toBeTruthy();
    expect(lis.at(1).contains(children[1])).toBeTruthy();
  });

  it('applies className and rest-properties', () => {
    mounted.setProps({ className: 'foo', 'data-test': 'bar' });
    expect(mounted.find('nav').hasClass('foo')).toBeTruthy();
    expect(mounted.find('nav').prop('data-test')).toEqual('bar');
  });
});
