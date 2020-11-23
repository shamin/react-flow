import { useReducer } from 'react';
import { BlockItem } from '../../types';
import { Action } from './actions';

interface State {
  blocks: BlockItem[];
  drag: boolean;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setBlocks':
      return {
        ...state,
        blocks: action.blocks,
      };
    case 'setInitialBlock':
      return { ...state, blocks: [action.block] };
    case 'addNewBlock':
      return {
        ...state,

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
        ...state,
        blocks: state.blocks.filter((b) => !action.blockIds.includes(b.id)),
        drag: true,
      };
    case 'attachBlocks':
      return {
        ...state,
        blocks: [
          ...state.blocks,
          ...action.blocks.map((b) =>
            b.parent === -1 ? { ...b, parent: action.newParent } : b
          ),
        ],
        drag: false,
      };
    default:
      throw new Error();
  }
};

export const useBlockState = () => useReducer(reducer, { blocks: [], drag: false });
