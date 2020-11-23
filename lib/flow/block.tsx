import React from 'react';
import { Droppable } from '../dnd/droppable';
import DraggableBlock from './draggableBlock';
import { useInteralFlow } from './provider';

interface DragHighlightProps {
  onDragOver: boolean;
}

const DragHighlight = ({ onDragOver }: DragHighlightProps) => {
  if (!onDragOver) {
    return null;
  }
  return (
    <div
      style={{
        background: 'blue',
        position: 'absolute',
        top: '100%',
        left: '50%',
        width: '20px',
        height: '20px',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
    ></div>
  );
};

interface BlockProps {
  x: number;
  y: number;
  name: string;
  id: number;
}

const BlockComponent: React.FC<BlockProps> = ({ x, y, name, id }: BlockProps) => {
  const { templates } = useInteralFlow();
  const { component } = templates[name];
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
      }}
    >
      <DraggableBlock
        id={id}
        draggable
        onClick={() => {
          console.log('Clicked on block', name);
        }}
      >
        <Droppable
          droppable
          id={`${id}`}
          offsetHeight={50}
          dropHighlightElement={(onDragOver) => (
            <DragHighlight onDragOver={onDragOver} />
          )}
        >
          <div>{component}</div>
        </Droppable>
      </DraggableBlock>
    </div>
  );
};

export default BlockComponent;
