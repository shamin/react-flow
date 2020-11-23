import React from 'react';
import { Canvas, DraggableBlock, FlowProvider } from '../lib';

const DragTemplate = ({ data }: any) => (
  <div
    style={{
      background: 'goldenrod',
      padding: 20,
      width: 100,
      height: 60,
      boxSizing: 'border-box',
    }}
  >
    {data}
  </div>
);

const App = () => (
  <FlowProvider blocks={[]} padding={{ x: 20, y: 80 }}>
    <Canvas
      style={{
        width: '100%',
        border: '1px solid #000',
        background: '#2f2b2b',
        height: 700,
        overflow: 'scroll',
      }}
    />
    <DraggableBlock
      id="block1"
      draggable
      blockTemplete={<DragTemplate data="Block 1" />}
      width={100}
      height={60}
    >
      Blocks
    </DraggableBlock>
    <DraggableBlock
      id="block2"
      draggable
      blockTemplete={<DragTemplate data="Block 2" />}
      width={100}
      height={60}
    >
      Block 2
    </DraggableBlock>
    <DraggableBlock
      id="block3"
      draggable
      blockTemplete={<DragTemplate data="Block 3" />}
      width={100}
      height={60}
    >
      Blocks 3
    </DraggableBlock>
  </FlowProvider>
);

export default App;
