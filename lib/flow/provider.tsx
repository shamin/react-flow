import React, { useContext, useEffect, useState } from 'react';
import { DndProvider } from '../dnd/provider';
import { Block, FlowBlocks, FlowPosition, StringOrNull, Template } from '../types';
import FlowDragController from './flowDragController';
import { addNewBlock, setInitialBlock } from './state/actions';
import { useBlockState } from './state/reducer';
import { setNotDraggingStyles } from './styles';

interface Templates {
  [id: string]: Template;
}

interface FlowContextType {
  firstBlockPosition: FlowPosition;
  padding: FlowPosition;
  blocks: Block[];
  pushTemplate: (id: string, template: Template) => void;
  templates: Templates;
  selectedBlock: number;
  setSelectedBlock: (blockId: number, blockName: string) => void;
  arrowColor: string;
}

const FlowContext = React.createContext<FlowContextType>({} as FlowContextType);

export const useInteralFlow = () => useContext(FlowContext);

interface FlowProviderProps {
  children: React.ReactElement | React.ReactElement[];
  blocks: FlowBlocks;
  padding: FlowPosition;
  onBlockSelected: (blockId: string) => void;
  arrowColor?: string;
}

export const FlowProvider = ({
  children,
  blocks,
  padding,
  arrowColor = '#000000',
  onBlockSelected,
}: FlowProviderProps) => {
  const [{ blocks: blockItems }, dispatch] = useBlockState();
  const [templates, setTemplates] = useState<Templates>({});
  const pushTemplate = (id: string, template: Template) => {
    setTemplates((templates) => ({ ...templates, [id]: template }));
  };

  const [firstBlockPosition, setFirstBlockPosition] = useState<FlowPosition>({
    x: 0,
    y: 0,
  });

  const [selectedBlock, setSelectedBlock] = useState<number>(-1);

  useEffect(() => {
    setNotDraggingStyles();
  }, []);

  const onSetFirstBlockPosition = (position: FlowPosition) => {
    setFirstBlockPosition(position);
  };

  const onSetSelectedBlock = (blockId: number, blockName: string) => {
    if (blockName !== 'canvas') {
      onBlockSelected(blockName);
    }
    setSelectedBlock(blockId);
  };

  const onBlockDropped = (
    drag: string,
    drop: string,
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
          width: templates[drag].width,
          height: templates[drag].height,
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
        width: templates[drag].width,
        height: templates[drag].height,
      })
    );
  };

  return (
    <FlowContext.Provider
      value={{
        firstBlockPosition,
        padding,
        blocks: blockItems as Block[],
        pushTemplate,
        templates,
        selectedBlock,
        setSelectedBlock: onSetSelectedBlock,
        arrowColor,
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
