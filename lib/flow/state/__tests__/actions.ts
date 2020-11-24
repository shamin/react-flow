import * as Actions from '../actions';
import { mockBlocks } from '../../__mocks__/blocks';

describe('Actions', () => {
  it('setBlocks action returns setBlocks type with blocks', () => {
    expect(Actions.setBlocks(mockBlocks)).toStrictEqual({
      type: 'setBlocks',
      blocks: mockBlocks,
    });
  });

  it('setInitialBlock action returns setInitialBlock type with block', () => {
    expect(Actions.setInitialBlock(mockBlocks[0])).toStrictEqual({
      type: 'setInitialBlock',
      block: mockBlocks[0],
    });

    expect(Actions.setInitialBlock(mockBlocks[1])).toStrictEqual({
      type: 'setInitialBlock',
      block: mockBlocks[1],
    });
  });

  it('addNewBlock action returns addNewBlock type with block', () => {
    expect(Actions.addNewBlock(mockBlocks[0])).toStrictEqual({
      type: 'addNewBlock',
      block: mockBlocks[0],
    });

    expect(Actions.addNewBlock(mockBlocks[1])).toStrictEqual({
      type: 'addNewBlock',
      block: mockBlocks[1],
    });
  });

  it('removeBlocksDrag action returns removeBlocks type with blockIds and drag as true', () => {
    expect(Actions.removeBlocksDrag(mockBlocks.map((b) => b.id))).toStrictEqual({
      type: 'removeBlocks',
      blockIds: mockBlocks.map((b) => b.id),
      drag: true,
    });
  });

  it('removeBlocks action returns removeBlocks type with blockIds and drag as false', () => {
    expect(Actions.removeBlocks(mockBlocks.map((b) => b.id))).toStrictEqual({
      type: 'removeBlocks',
      blockIds: mockBlocks.map((b) => b.id),
      drag: false,
    });
  });

  it('attachBlocks action returns attachBlocks type with blocks and new parent', () => {
    expect(Actions.attachBlocks(mockBlocks, 1)).toStrictEqual({
      type: 'attachBlocks',
      blocks: mockBlocks,
      newParent: 1,
    });
  });
});
