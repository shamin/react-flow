import React from 'react';

interface ArrowProps {
  x: number;
  y: number;
  arrowPath: string;
  pointerPath: string;
  color: string;
}

export const Arrow: React.FC<ArrowProps> = ({
  x,
  y,
  arrowPath,
  pointerPath,
  color = '#000000',
}: ArrowProps) => {
  return (
    <div
      className="arrow-block"
      style={{ left: x, top: y, position: 'absolute', pointerEvents: 'none' }}
    >
      <svg
        style={{ overflow: 'visible' }}
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={arrowPath} stroke={color} strokeWidth="2px"></path>
        <path d={pointerPath} fill={color}></path>
      </svg>
    </div>
  );
};

export default Arrow;
