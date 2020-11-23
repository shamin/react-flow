import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Droppable } from '../dnd/droppable';
import { Block } from '../types';
import Arrow from './arrow';
import BlockComponent from './block';
import { computeAllBlockPos } from './core';
import { useInteralFlow } from './provider';

interface CanvasProps {
  style: React.CSSProperties;
}

export const Canvas: React.FC<CanvasProps> = ({ style }: CanvasProps) => {
  const canvasRef = useRef(null);

  const { firstBlockPosition, padding, blocks, setSelectedBlock } = useInteralFlow();

  const [firstBlockPos, setFirstBlockPos] = useState(firstBlockPosition);

  useEffect(() => {
    setFirstBlockPos(firstBlockPosition);
  }, [firstBlockPosition]);

  const recomputeBlockPosition = useCallback(() => {
    if (canvasRef.current !== null) {
      const element = (canvasRef.current as unknown) as HTMLElement;
      const relativePosition = {
        x: firstBlockPos.x - element.getBoundingClientRect().left,
        y: firstBlockPos.y - element.getBoundingClientRect().top,
      };
      const newBlocks: Block[] = computeAllBlockPos(
        blocks,
        relativePosition,
        padding
      );

      const minOffsetLeft = Math.min(...newBlocks.map((b) => b.x));
      if (minOffsetLeft < 20) {
        setFirstBlockPos({
          ...firstBlockPos,
          x: firstBlockPos.x + Math.abs(minOffsetLeft) + 20,
        });
      }
      return newBlocks;
    }
    return [];
  }, [blocks, firstBlockPos]);

  const blocksWithPosition = recomputeBlockPosition();

  return (
    <div ref={canvasRef} style={style} className="canvas">
      <Droppable
        id="canvas"
        droppable={blocks.length <= 0}
        offsetHeight={'100%'}
        onClick={() => {
          setSelectedBlock(-1, 'canvas');
        }}
      >
        <div>
          {blocksWithPosition.map((b) => (
            <React.Fragment key={b.id}>
              <BlockComponent x={b.x} y={b.y} name={b.name} id={b.id} />
              {b.arrow && <Arrow {...b.arrow} />}
            </React.Fragment>
          ))}
        </div>
      </Droppable>
    </div>
  );
};
