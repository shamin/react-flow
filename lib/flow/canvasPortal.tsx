import Portal from '@space-kit/portal';
import React from 'react';
import { Block, FlowPosition } from '../types';
import Arrow from './arrow';
import BlockComponent from './block';
import { computeAllBlockPos } from './core';

interface CanvasPortalProps {
  blocks: Block[];
  intialBlockPos: FlowPosition;
  padding: FlowPosition;
}

const CanvasPortal: React.FC<CanvasPortalProps> = ({
  blocks,
  intialBlockPos,
  padding,
}: CanvasPortalProps) => {
  const blocksWithPos = computeAllBlockPos(blocks, intialBlockPos, padding);

  return (
    <Portal>
      <div
        style={{
          pointerEvents: 'none',
        }}
      >
        {blocksWithPos.map((b: Block, i: number) => (
          <React.Fragment key={i}>
            <BlockComponent x={b.x} y={b.y} name={b.name} id={b.id} />
            {b.arrow && <Arrow {...b.arrow} />}
          </React.Fragment>
        ))}
      </div>
    </Portal>
  );
};

export default CanvasPortal;
