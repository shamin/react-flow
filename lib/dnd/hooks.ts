import { useEffect, useState } from 'react';
import { FlowPosition } from '../types';

export const useDragging = (
  onDragStart: (clickPosition: FlowPosition) => void,
  onDragEnd: (dropPosition: FlowPosition) => void,
  onDraggableClick: () => void
) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [watchMove, setWatchMove] = useState<boolean>(false);
  const [clickPos, setClickPos] = useState<FlowPosition>({ x: 0, y: 0 });
  const [dragPosition, setdragPosition] = useState<FlowPosition>({ x: 0, y: 0 });

  const onMouseDownHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element: HTMLDivElement = e.target as HTMLDivElement;
    setWatchMove(true);

    const clickPos = {
      x: e.clientX - element.getBoundingClientRect().left,
      y: e.clientY - element.getBoundingClientRect().top,
    };

    setClickPos(clickPos);
    setdragPosition({
      x: e.clientX - clickPos.x,
      y: e.clientY - clickPos.y,
    });
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) {
        onDragStart(clickPos);
        setDragging(true);
      }
      setdragPosition({
        x: e.clientX - clickPos.x,
        y: e.clientY - clickPos.y,
      });
    };

    const onMouseUp = (e: MouseEvent) => {
      setWatchMove(false);
      if (!dragging) {
        onDraggableClick();
        return;
      }
      setDragging(false);
      onDragEnd({
        x: e.clientX - clickPos.x,
        y: e.clientY - clickPos.y,
      });
    };

    if (watchMove) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [watchMove, dragging, onDragEnd]);

  return {
    onMouseDownHandler,
    dragPosition,
    dragging,
  };
};
