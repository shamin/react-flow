import { useReducer } from 'react';
import { BlockItem } from '../../types';
import { Action } from './actions';

interface State {
  blocks: BlockItem[];
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setInitialBlock':
      return { blocks: [action.block] };
    case 'addNewBlock':
      return {
        blocks: [
          ...state.blocks,
          {
            ...action.block,
            id: Math.max(...state.blocks.map((b) => b.id)) + 1,
          },
        ],
      };
    case 'removeBlocks':
      return {
        blocks: state.blocks.filter((b) => !action.blockIds.includes(b.id)),
      };
    case 'attachBlocks':
      return {
        blocks: [
          ...state.blocks,
          ...action.blocks.map((b) =>
            b.parent === -1 ? { ...b, parent: action.newParent } : b
          ),
        ],
      };
    default:
      throw new Error();
  }
};

export const useBlockState = () => useReducer(reducer, { blocks: [] });
