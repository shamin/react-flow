import React, { useContext, useState } from 'react';
import { DndProvider } from '../dnd/provider';
import { Block, BlockItem, FlowBlocks, FlowPosition, StringOrNull } from '../types';
import FlowDragController from './flowDragController';
import { addNewBlock, setInitialBlock } from './state/actions';
import { useBlockState } from './state/reducer';

interface FlowContextType {
  firstBlockPosition: FlowPosition;
  onSetFirstBlockPosition: (position: FlowPosition) => void;
  padding: FlowPosition;
  blocks: Block[];
}

const FlowContext = React.createContext<FlowContextType>({} as FlowContextType);

export const useInteralFlow = () => useContext(FlowContext);

interface FlowProviderProps {
  children: React.ReactElement | React.ReactElement[];
  blocks: FlowBlocks;
  padding: FlowPosition;
}

export const FlowProvider = ({ children, blocks, padding }: FlowProviderProps) => {
  const [{ blocks: blockItems }, dispatch] = useBlockState();

  const [firstBlockPosition, setFirstBlockPosition] = useState<FlowPosition>({
    x: 0,
    y: 0,
  });

  const onSetFirstBlockPosition = (position: FlowPosition) => {
    setFirstBlockPosition(position);
  };

  const onBlockDropped = (
    drag: StringOrNull,
    drop: StringOrNull,
    dropPosition: FlowPosition
  ) => {
    if (blockItems.length === 0) {
      setFirstBlockPosition(dropPosition);
      dispatch(
        setInitialBlock({
          parent: -1,
          id: 0,
          name: drag,
          type: drag,
          width: 95,
          height: 58,
        })
      );
      return;
    }
    dispatch(
      addNewBlock({
        parent: parseInt(drop),
        id: 0,
        name: drag,
        type: drag,
        width: 95,
        height: 58,
      })
    );
  };

  return (
    <FlowContext.Provider
      value={{
        firstBlockPosition,
        onSetFirstBlockPosition,
        padding,
        blocks: blockItems as Block[],
      }}
    >
      <DndProvider
        onDrop={(drag, drop, dropPosition) => {
          if (drag && drop) {
            onBlockDropped(drag, drop, dropPosition);
          }
        }}
      >
        <FlowDragController
          blocks={blockItems}
          dispatch={dispatch}
          onCanvasDrag={onSetFirstBlockPosition}
        >
          {children}
        </FlowDragController>
      </DndProvider>
    </FlowContext.Provider>
  );
};
