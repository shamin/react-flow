import { Block } from '../../types';
import {
  computeAllBlockPos,
  getAllChildrenBlocks,
  getBlockChildren,
  recalcChildrenWidth,
} from '../core';
import { mockBlocks, mockPadding, mockFirstBlockPos } from '../__mocks__/blocks';

test('getBlockChildren returns the direct children of a block', () => {
  expect(
    getBlockChildren(mockBlocks as Block[], mockBlocks[1] as Block).map((b) => b.id)
  ).toEqual([3, 4]);
  expect(
    getBlockChildren(mockBlocks as Block[], mockBlocks[3] as Block).map((b) => b.id)
  ).toEqual([5, 6]);
  expect(
    getBlockChildren(mockBlocks as Block[], mockBlocks[2] as Block).map((b) => b.id)
  ).toEqual([]);
});

test('getAllChildrenBlocks returns the all the children of a block', () => {
  expect(
    getAllChildrenBlocks(mockBlocks as Block[], mockBlocks[1] as Block).map(
      (b) => b.id
    )
  ).toEqual([3, 4, 5, 6]);
  expect(
    getAllChildrenBlocks(mockBlocks as Block[], mockBlocks[3] as Block).map(
      (b) => b.id
    )
  ).toEqual([5, 6]);
  expect(
    getAllChildrenBlocks(mockBlocks as Block[], mockBlocks[2] as Block).map(
      (b) => b.id
    )
  ).toEqual([]);
});

test('recalcChildrenWidth calculates returns the width of children', () => {
  expect(
    recalcChildrenWidth(mockBlocks as Block[], mockBlocks[1] as Block, mockPadding)
  ).toEqual(
    mockBlocks[5].width +
      mockBlocks[6].width +
      mockBlocks[4].width +
      2 * mockPadding.x
  );
  expect(
    recalcChildrenWidth(mockBlocks as Block[], mockBlocks[3] as Block, mockPadding)
  ).toEqual(mockBlocks[5].width + mockBlocks[6].width + mockPadding.x);
});

test('computeAllBlockPos returns the blocks with their positions and arrow details', () => {
  const blocksWithPositions = computeAllBlockPos(
    mockBlocks as Block[],
    mockFirstBlockPos,
    mockPadding
  );

  const expectedXValues = [0, -60, 205, -120, 85, -205, -60];
  const expectedYValues = [0, 140, 140, 280, 280, 420, 420];

  expect(blocksWithPositions.map((b) => b.x)).toEqual(expectedXValues);
  expect(blocksWithPositions.map((b) => b.y)).toEqual(expectedYValues);
  expect(blocksWithPositions.map((b) => b.arrow)[1]).toMatchObject({
    x: expect.any(Number),
    y: expect.any(Number),
    arrowPath: expect.any(String),
    pointerPath: expect.any(String),
  });
});
