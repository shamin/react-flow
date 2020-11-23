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
        background: '#217CE8',
        position: 'absolute',
        top: '100%',
        left: '50%',
        width: '20px',
        height: '20px',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 1,
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
  const { templates, setSelectedBlock, selectedBlock } = useInteralFlow();
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
          setSelectedBlock(id, name);
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
          <div>{component({ isActive: selectedBlock === id })}</div>
        </Droppable>
      </DraggableBlock>
    </div>
  );
};

export default BlockComponent;
