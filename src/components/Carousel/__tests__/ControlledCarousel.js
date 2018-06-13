import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import { ControlledCarousel as Carousel, CarouselPanel } from '..';

describe('<Carousel />', () => {
  const context = { assetBasePath: '/' };
  const childContextTypes = { assetBasePath: PropTypes.string };
  const options = { context, childContextTypes };
  const onPanelChange = jest.fn();

  const getComponent = (props, panels = []) => mount(
    <Carousel {...props}>
      {panels.map((panelProps, i) => (
        <CarouselPanel
          id={`panel-${i}`}
          imageUrl={`/assets/images/carousel/carousel-0${i}.jpg`}
          key={`p${i}`} // eslint-disable-line react/no-array-index-key
          {...panelProps}
        />
      ))}
    </Carousel>, options);

  it('renders without crashing', () => {
    expect(getComponent({ onPanelChange }).find('.slds-carousel').length).toEqual(1);
  });

  it('renders every panel', () => {
    const mounted = getComponent({ onPanelChange }, [
      { title: 'Title 1', children: 'Content 1' },
      { title: 'Title 2', children: 'Content 2' },
    ]);

    expect(mounted.find('.slds-carousel__panel'))
      .toHaveLength(2);
  });

  it('activates the first panel', () => {
    const mounted = getComponent({ onPanelChange }, [
      { title: 'Title 1', children: 'Content 1' },
      { title: 'Title 2', children: 'Content 2' },
    ]);

    expect(mounted.find('CarouselPanel').at(0).prop('active'))
      .toBe(true);
    expect(mounted.find('CarouselPanel').at(1).prop('active'))
      .toBe(false);
  });

  it('handles keyboard interaction', () => {
    const mounted = getComponent({ onPanelChange }, [
      { title: 'Title 1', children: 'Content 1' },
      { title: 'Title 2', children: 'Content 2' },
    ]);

    mounted.find('CarouselPanel').at(0).find('a').simulate('keydown', { keyCode: 39 });

    // expect mockfunction to have been called
  });

  it('returns the right index on arrow keydown and also wraps around', () => {
    const mounted = getComponent({ onPanelChange }, [
      { title: 'Title 1', children: 'Content 1' },
    ]);

    mounted.find('CarouselPanel').at(0).find('a').simulate('keydown', { keyCode: 39 });
    // expect mockfunction to have been called with [0]
  });

  it('does not render the autplay controls by default', () => {
    const mounted = getComponent({
      autoPlay: true,
      onPanelChange,
    }, [
      { title: 'Title 1', children: 'Content 1' },
      { title: 'Title 2', children: 'Content 2' },

      // expect thingy to be false
    ]);
  });

  it('shows the autoplay controls correctly', () => {
    let mounted = getComponent({
      autoPlay: true,
      autoPlayActive: true,
      onPanelChange,
    }, [
      { title: 'Title 1', children: 'Content 1' },
      { title: 'Title 2', children: 'Content 2' },
    ]);

    // check for pause button

    mounted = getComponent({
      autoPlay: true,
      autoPlayActive: false,
      onPanelChange,
    }, [
      { title: 'Title 1', children: 'Content 1' },
      { title: 'Title 2', children: 'Content 2' },
    ]);

    // check for play button
  });

  it('calls the autoplay handler', () => {
    const mounted = getComponent({
      autoPlay: true,
      onPanelChange,
    }, [
      { title: 'Title 1', children: 'Content 1' },
      { title: 'Title 2', children: 'Content 2' },
    ]);

    // check for mockfunction call
  });
});