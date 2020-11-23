import { BlockItem } from '../../types';

export type Action =
  | { type: 'setBlocks'; blocks: BlockItem[] }
  | { type: 'setInitialBlock'; block: BlockItem }
  | { type: 'addNewBlock'; block: BlockItem }
  | { type: 'attachBlocks'; blocks: BlockItem[]; newParent: number }
  | { type: 'removeBlocks'; blockIds: number[]; drag: boolean };

export const setBlocks = (blocks: BlockItem[]): Action => ({
  type: 'setBlocks',
  blocks,
});

export const setInitialBlock = (block: BlockItem): Action => ({
  type: 'setInitialBlock',
  block,
});

export const addNewBlock = (block: BlockItem): Action => ({
  type: 'addNewBlock',
  block,
});

export const removeBlocksDrag = (blockIds: number[]): Action => ({
  type: 'removeBlocks',
  blockIds,
  drag: true,
});

export const removeBlocks = (blockIds: number[]): Action => ({
  type: 'removeBlocks',
  blockIds,
  drag: false,
});

export const attachBlocks = (blocks: BlockItem[], newParent: number): Action => ({
  type: 'attachBlocks',
  blocks,
  newParent,
});
