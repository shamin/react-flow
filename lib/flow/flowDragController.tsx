import React, { useContext, useEffect, useState } from 'react';
import { useDnd } from '../dnd/provider';
import { Block, BlockItem, FlowPosition, StringOrNull } from '../types';
import CanvasPortal from './canvasPortal';
import { getAllChildrenBlocks } from './core';
import { Action, attachBlocks, removeBlocks } from './state/actions';

interface FlowDragContextTypes {
  findChildrenSetTemp: (
    blockId: number,
    clickPosition: FlowPosition,
    dragPosition: FlowPosition
  ) => void;
}

const FlowDragContext = React.createContext<FlowDragContextTypes>(
  {} as FlowDragContextTypes
);

export const useInternalFlowDrag = () => useContext(FlowDragContext);

interface FlowDragControllerProps {
  blocks: BlockItem[];
  dispatch: React.Dispatch<Action>;
  onCanvasDrag: (newPositon: FlowPosition) => void;
  children: React.ReactElement | React.ReactElement[];
}

const FlowDragController = ({
  blocks,
  dispatch,
  onCanvasDrag,
  children,
}: FlowDragControllerProps) => {
  const onDrop = (drop: StringOrNull, dropPosition: FlowPosition) => {
    setTempBlocks(undefined);
    if (!drop) {
      dispatch(attachBlocks(tempBlocks as BlockItem[], tempBlockParent));
      return;
    }

    if (drop === 'canvas') {
      onCanvasDrag(dropPosition);
      dispatch(attachBlocks(tempBlocks as BlockItem[], -1));
      return;
    }

    dispatch(attachBlocks(tempBlocks as BlockItem[], parseInt(drop as string)));
  };

  const {
    setDragPos,
    setClickPos,
    setWatchMove,
    dragPos,
    clickPos,
  } = useFlowDragging(onDrop);
  const [tempBlocks, setTempBlocks] = useState<BlockItem[]>();
  const [tempBlockParent, setTempBlockParent] = useState<number>();

  const findChildrenSetTemp = (
    blockId: number,
    clickPos: FlowPosition,
    dragPos: FlowPosition
  ) => {
    const currentBlock = blocks.find((b) => b.id === blockId);
    const children = getAllChildrenBlocks(blocks as Block[], {
      id: blockId,
    });
    dispatch(removeBlocks([blockId, ...children.map((c) => c.id)]));

    setDragPos(dragPos);
    setClickPos(clickPos);
    setTempBlockParent(currentBlock!.parent);
    setTempBlocks([{ ...currentBlock!, parent: -1 }, ...children]);
    setWatchMove(true);
  };

  return (
    <FlowDragContext.Provider value={{ findChildrenSetTemp }}>
      {children}
      {tempBlocks && (
        <CanvasPortal
          blocks={tempBlocks as Block[]}
          intialBlockPos={
            {
              x: dragPos.x - clickPos.x,
              y: dragPos.y - clickPos.y,
            } as FlowPosition
          }
          padding={{ x: 20, y: 80 }}
        />
      )}
    </FlowDragContext.Provider>
  );
};

export default FlowDragController;

const useFlowDragging = (
  onDrop: (drop: StringOrNull, dropPosition: FlowPosition) => void
) => {
  const [watchMove, setWatchMove] = useState(false);
  const [dragPos, setDragPos] = useState<FlowPosition>({ x: 0, y: 0 });
  const [clickPos, setClickPos] = useState<FlowPosition>({ x: 0, y: 0 });

  const { drop, setDrag, setDrop } = useDnd();

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setDragPos({ x: e.clientX, y: e.clientY });
    };

    const onMouseUp = (e: MouseEvent) => {
      setWatchMove(false);
      setDragPos({ x: 0, y: 0 });

      onDrop(drop, {
        x: e.clientX - clickPos.x,
        y: e.clientY - clickPos.y,
      });

      setDrop(null);
      setDrag(null);
    };
    if (watchMove) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [drop, setDrag, setDrop, watchMove]);

  return {
    dragPos,
    setDragPos,
    setClickPos,
    setWatchMove,
    clickPos,
  };
};
