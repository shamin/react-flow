import React from 'react';
import { Canvas, DraggableBlock, FlowProvider } from '../lib';

const blocks = [
  {
    parent: -1,
    id: 0,
    name: 'block2',
    type: 'block2',
    width: 100,
    height: 60,
  },
  {
    parent: 0,
    id: 1,
    name: 'block3',
    type: 'block3',
    width: 100,
    height: 60,
  },
  {
    parent: 0,
    id: 2,
    name: 'block1',
    type: 'block1',
    width: 100,
    height: 60,
  },
  {
    parent: 1,
    id: 3,
    name: 'block3',
    type: 'block3',
    width: 100,
    height: 60,
  },
  {
    parent: 1,
    id: 4,
    name: 'block1',
    type: 'block1',
    width: 100,
    height: 60,
  },
];

const DragTemplate = ({ data, isActive }: any) => (
  <div
    style={{
      background: isActive ? 'rebeccapurple' : 'goldenrod',
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
  <FlowProvider
    blocks={blocks}
    padding={{ x: 20, y: 80 }}
    arrowColor="#ffffff"
    onBlockSelected={(blockId: string) => {
      console.log('Block selected', blockId);
    }}
  >
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
      blockTemplete={({ isActive }) => (
        <DragTemplate data="Block 1" isActive={isActive} />
      )}
      width={100}
      height={60}
    >
      Blocks
    </DraggableBlock>
    <DraggableBlock
      id="block2"
      draggable
      blockTemplete={({ isActive }) => (
        <DragTemplate data="Block 2" isActive={isActive} />
      )}
      width={100}
      height={60}
    >
      Block 2
    </DraggableBlock>
    <DraggableBlock
      id="block3"
      draggable
      blockTemplete={({ isActive }) => (
        <DragTemplate data="Block 3" isActive={isActive} />
      )}
      width={100}
      height={60}
    >
      Blocks 3
    </DraggableBlock>
  </FlowProvider>
);

export default App;
