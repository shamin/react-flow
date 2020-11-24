import React from 'react';
import { render } from '@testing-library/react';
import { Arrow } from '../arrow';

const mockArrow = {
  x: 300,
  y: 400,
  arrowPath: 'M20 0L20 40L20 40L20 80',
  pointerPath: 'M15 75H25L20 80L15 75Z',
  color: '#ccc',
};

describe('Arrow', () => {
  let arrowContainer: Element;
  beforeEach(() => {
    const { container } = render(<Arrow {...mockArrow} />);
    arrowContainer = container;
  });

  it('rendering the arrow path and pointer path', () => {
    const paths = arrowContainer.querySelectorAll('path');
    expect(paths.length).toBe(2);
    expect(paths[0].getAttribute('d')).toBe(mockArrow.arrowPath);
    expect(paths[1].getAttribute('d')).toBe(mockArrow.pointerPath);
  });

  it('sets the position of arrow when passed as props', () => {
    const arrow = arrowContainer.getElementsByTagName('div')[0];
    expect(arrow.style.left).toBe(`${mockArrow.x}px`);
    expect(arrow.style.top).toBe(`${mockArrow.y}px`);
  });

  it('sets the arrow path color fill when color is passed as props', () => {
    const paths = arrowContainer.querySelectorAll('path');
    expect(paths[0].getAttribute('stroke')).toBe(mockArrow.color);
    expect(paths[1].getAttribute('fill')).toBe(mockArrow.color);
  });
});
