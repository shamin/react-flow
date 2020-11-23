import { BlockItem } from '../../types';

export type Action =
  | { type: 'setInitialBlock'; block: BlockItem }
  | { type: 'addNewBlock'; block: BlockItem }
  | { type: 'removeBlocks'; blockIds: number[] }
  | { type: 'attachBlocks'; blocks: BlockItem[]; newParent: number };

export const setInitialBlock = (block: BlockItem): Action => ({
  type: 'setInitialBlock',
  block,
});

export const addNewBlock = (block: BlockItem): Action => ({
  type: 'addNewBlock',
  block,
});

export const removeBlocks = (blockIds: number[]): Action => ({
  type: 'removeBlocks',
  blockIds,
});

export const attachBlocks = (blocks: BlockItem[], newParent: number): Action => ({
  type: 'attachBlocks',
  blocks,
  newParent,
});
