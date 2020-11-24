import { mockBlocks } from '../../__mocks__/blocks';
import { reducer } from '../reducer';

describe('Reducer', () => {
  const initialState = {
    blocks: [],
    drag: false,
  };

  it('setBlocks will set the blocks', () => {
    const newState = reducer(initialState, {
      type: 'setBlocks',
      blocks: mockBlocks,
    });

    expect(newState).toMatchObject({
      blocks: mockBlocks,
      drag: false,
    });
  });

  it('setInitialBlock will set initial block', () => {
    const newState = reducer(initialState, {
      type: 'setInitialBlock',
      block: mockBlocks[0],
    });

    expect(newState).toMatchObject({
      blocks: [mockBlocks[0]],
      drag: false,
    });
  });

  it('addNewBlock will append a new block to blocks', () => {
    const newState = reducer(
      { ...initialState, blocks: [mockBlocks[0]] },
      {
        type: 'addNewBlock',
        block: mockBlocks[1],
      }
    );

    expect(newState).toMatchObject({
      blocks: [mockBlocks[0], mockBlocks[1]],
      drag: false,
    });
  });

  it('attachBlocks will attach a set of blocks to a parent', () => {
    const newState = reducer(
      { ...initialState, blocks: [mockBlocks[0], mockBlocks[1], mockBlocks[2]] },
      {
        type: 'attachBlocks',
        blocks: [{ ...mockBlocks[3], parent: -1 }, mockBlocks[4]],
        newParent: 1,
      }
    );

    expect(newState).toMatchObject({
      blocks: [
        mockBlocks[0],
        mockBlocks[1],
        mockBlocks[2],
        mockBlocks[3],
        mockBlocks[4],
      ],
      drag: false,
    });
  });

  it('removeBlocks will remove a set of blocks with blockIds also sets whether it is a drag', () => {
    const newState = reducer(
      { ...initialState, blocks: [mockBlocks[0], mockBlocks[1], mockBlocks[2]] },
      {
        type: 'removeBlocks',
        blockIds: [1, 2],
        drag: false,
      }
    );

    expect(newState).toMatchObject({
      blocks: [mockBlocks[0]],
      drag: false,
    });

    const newDragState = reducer(
      { ...initialState, blocks: [mockBlocks[0], mockBlocks[1], mockBlocks[2]] },
      {
        type: 'removeBlocks',
        blockIds: [1, 2],
        drag: true,
      }
    );

    expect(newDragState).toMatchObject({
      blocks: [mockBlocks[0]],
      drag: true,
    });
  });
});
