import React from 'react';
import { Canvas, DraggableBlock, FlowProvider } from '../lib';

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
    <DraggableBlock id="block1" draggable>
      Blocks
    </DraggableBlock>
  </FlowProvider>
);

export default App;
