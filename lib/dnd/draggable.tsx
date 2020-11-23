import React, { useEffect } from 'react';
import Portal from '@space-kit/portal';
import { useDragging } from './hooks';
import { FlowPosition } from '../types';
import { useDnd } from './provider';
import { useInteralFlow } from '../flow/provider';

interface DraggableProps {
  id: string;
  children: React.ReactChild;
  draggable?: boolean;
  clone?: boolean;
  onClick?: () => void;
  blockTemplete: React.ReactChild;
}

export const Draggable: React.FC<DraggableProps> = ({
  children,
  draggable,
  id,
  clone,
  onClick,
  blockTemplete,
}: DraggableProps) => {
  const { drag, setDrag, onDrop } = useDnd();
  const { pushTemplate } = useInteralFlow();

  useEffect(() => {
    pushTemplate(id, blockTemplete);
  }, [id, blockTemplete]);

  const onDragStart = (clickPosition: FlowPosition) => {
    setDrag(id);
  };

  const onDragEnd = (dropPosition: FlowPosition) => {
    setDrag(null);
    onDrop(dropPosition);
  };

  const onDraggableClick = () => {
    onClick && onClick();
  };

  const { onMouseDownHandler, dragPosition, dragging } = useDragging(
    onDragStart,
    onDragEnd,
    onDraggableClick
  );

  return (
    <div>
      <div
        style={{
          display: 'inline-block',
          userSelect: 'none',
        }}
        onMouseDown={draggable ? onMouseDownHandler : undefined}
      >
        {dragging ? clone && children : children}
      </div>
      {dragging && (
        <Portal>
          <div>
            {React.createElement(
              'div',
              {
                className: 'draggable__item',
                style: {
                  position: 'fixed',
                  top: dragPosition.y,
                  left: dragPosition.x,
                  userSelect: 'none',
                  pointerEvents: drag ? 'none' : 'auto',
                },
              },
              children
            )}
          </div>
        </Portal>
      )}
    </div>
  );
};
