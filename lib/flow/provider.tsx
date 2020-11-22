import React from 'react';
import { DndProvider } from '../dnd/provider';
import { FlowBlocks } from '../types';

interface FlowProviderProps {
  children: React.ReactElement | React.ReactElement[];
  blocks: FlowBlocks;
}

export const FlowProvider = ({ children, blocks }: FlowProviderProps) => {
  return (
    <DndProvider
      onDrop={() => {
        console.log('Dropped');
      }}
    >
      {children}
    </DndProvider>
  );
};
