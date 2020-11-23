import React, { useContext, useEffect, useState } from 'react';
import { DndProvider } from '../dnd/provider';
import { Block, BlockItem, FlowPosition, Template } from '../types';
import { getAllChildrenBlocks } from './core';
import FlowDragController from './flowDragController';
import {
  addNewBlock,
  removeBlocks,
  setBlocks,
  setInitialBlock,
} from './state/actions';
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
  removeBlock: (blockId: number) => void;
}

const FlowContext = React.createContext<FlowContextType>({} as FlowContextType);

export const useInteralFlow = () => useContext(FlowContext);
export const useFlow = () => {
  const { blocks, removeBlock } = useContext(FlowContext);
  return { blocks, removeBlock };
};

interface FlowProviderProps {
  children: React.ReactElement | React.ReactElement[];
  blocks: BlockItem[];
  padding: FlowPosition;
  onBlockSelected: (blockId: string) => void;
  arrowColor?: string;
  onBlockChange: (blocks: BlockItem[]) => void;
}

export const FlowProvider = ({
  children,
  blocks,
  padding,
  arrowColor = '#000000',
  onBlockSelected,
  onBlockChange,
}: FlowProviderProps) => {
  const [{ blocks: blockItems, drag }, dispatch] = useBlockState();
  const [templates, setTemplates] = useState<Templates>({});
  const pushTemplate = (id: string, template: Template) => {
    setTemplates((templates) => ({ ...templates, [id]: template }));
  };

  const [firstBlockPosition, setFirstBlockPosition] = useState<FlowPosition>({
    x: 100,
    y: 100,
  });

  const [selectedBlock, setSelectedBlock] = useState<number>(-1);

  useEffect(() => {
    setNotDraggingStyles();
    dispatch(setBlocks(blocks));
  }, []);

  useEffect(() => {
    if (!drag) {
      onBlockChange(blockItems);
    }
  }, [blockItems, drag]);

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

  const removeBlock = (blockId: number) => {
    const children = getAllChildrenBlocks(blockItems as Block[], {
      id: blockId,
    });
    dispatch(removeBlocks([blockId, ...children.map((c) => c.id)]));
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
        removeBlock,
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
