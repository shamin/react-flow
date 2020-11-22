import React from 'react';

interface CanvasProps {
  style: React.CSSProperties;
}

export const Canvas: React.FC<CanvasProps> = ({ style }: CanvasProps) => {
  return <div style={style} className="canvas"></div>;
};
