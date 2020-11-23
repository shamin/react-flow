import React, { useEffect, useState } from 'react';
import { useDnd } from '../dnd/provider';
import { FlowPosition } from '../types';
import { useInternalFlowDrag } from './flowDragController';
import { setDraggingStyles } from './styles';

interface DraggableBlockProps {
  id: number;
  children: React.ReactChild;
  draggable?: boolean;
  onClick?: () => void;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({
  id,
  children,
  draggable,
  onClick,
}: DraggableBlockProps) => {
  const { setDrag } = useDnd();
  const { findChildrenSetTemp } = useInternalFlowDrag();

  const onDragStart = (clickPos: FlowPosition, dragPos: FlowPosition) => {
    setDrag(`${id}`);
    findChildrenSetTemp(id, clickPos, dragPos);
  };

  const onDraggableClick = () => {
    setDrag(null);
    onClick && onClick();
  };

  const { onMouseDownHandler } = useDragging(
    onDragStart,
    onDraggableClick,
    findChildrenSetTemp
  );

  return (
    <div>
      <div
        data-react-flow-draggable-flow={id}
        style={{
          display: 'inline-block',
          userSelect: 'none',
        }}
        onMouseDown={draggable ? onMouseDownHandler : undefined}
      >
        {children}
      </div>
    </div>
  );
};

export default DraggableBlock;

const useDragging = (
  onDragStart: (clickPos: FlowPosition, dragPos: FlowPosition) => void,
  onDraggableClick: () => void,
  findChildrenSetTemp: (
    blockId: number,
    clickPosition: FlowPosition,
    dragPosition: FlowPosition
  ) => void
) => {
  const [watchMove, setWatchMove] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [clickPos, setClickPos] = useState<FlowPosition>({
    x: 0,
    y: 0,
  });
  const [dragPos, setDragPos] = useState<FlowPosition>({
    x: 0,
    y: 0,
  });

  const onMouseDownHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element: HTMLDivElement = e.target as HTMLDivElement;

    setWatchMove(true);
    const clickPos = {
      x: e.clientX - element.getBoundingClientRect().left,
      y: e.clientY - element.getBoundingClientRect().top,
    };
    setClickPos(clickPos);
    setDragPos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  useEffect(() => {
    const onMouseMove = () => {
      setDragging(true);
      setDraggingStyles();
      if (watchMove) {
        onDragStart(clickPos, dragPos);
      }
    };

    const onMouseUp = () => {
      if (!dragging) {
        onDraggableClick && onDraggableClick();
      }
      setDragging(false);
      setWatchMove(false);
    };

    if (watchMove) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [watchMove, clickPos, dragPos, findChildrenSetTemp]);

  return {
    onMouseDownHandler,
  };
};
