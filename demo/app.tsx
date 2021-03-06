import React from 'react';
import { Canvas, DraggableBlock, FlowProvider, BlockItem } from '../lib';

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
  {
    parent: 3,
    id: 5,
    name: 'block2',
    type: 'block2',
    width: 100,
    height: 60,
  },
  {
    parent: 3,
    id: 6,
    name: 'block3',
    type: 'block3',
    width: 150,
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
    onBlockChange={(blocks: BlockItem[]) => {
      console.log(blocks);
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
    <div
      style={{
        display: 'inline-grid',
        gridTemplateColumns: 'auto auto auto',
        padding: 10,
        columnGap: 20,
      }}
    >
      <DraggableBlock
        id="block1"
        draggable
        blockTemplate={({ isActive }) => (
          <DragTemplate data="Block 1" isActive={isActive} />
        )}
        width={100}
        height={60}
        clone
      >
        <div style={{ padding: 20, border: '1px solid #000' }}>Block 1</div>
      </DraggableBlock>
      <DraggableBlock
        id="block2"
        draggable
        blockTemplate={({ isActive }) => (
          <DragTemplate data="Block 2" isActive={isActive} />
        )}
        width={100}
        height={60}
        clone
      >
        <div style={{ padding: 20, border: '1px solid #000' }}>Block 2</div>
      </DraggableBlock>
      <DraggableBlock
        id="block3"
        draggable
        blockTemplate={({ isActive }) => (
          <DragTemplate data="Block 3" isActive={isActive} />
        )}
        width={100}
        height={60}
        clone
      >
        <div style={{ padding: 20, border: '1px solid #000' }}>Blocks 3</div>
      </DraggableBlock>
    </div>
  </FlowProvider>
);

export default App;
