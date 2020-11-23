import produce from 'immer';
import { Block, FlowPosition } from '../types';

function getBlockChildren(blocks: Block[], block: Block): Block[] {
  return blocks.filter((b) => b.parent === block.id);
}

const recalcChildrenWidth = (
  blocks: Block[],
  parent: Block,
  padding: FlowPosition
) => {
  const children = getBlockChildren(blocks, parent);
  if (children.length === 0) {
    parent.childWidth = parent.width;
    return parent.width;
  }
  let widthOfChildren = 0;
  children.forEach((child) => {
    widthOfChildren += recalcChildrenWidth(blocks, child, padding);
  });

  const childrenPadding = (children.length - 1) * padding.x;
  parent.childWidth = widthOfChildren + childrenPadding;
  return parent.childWidth;
};

const generateArrow = (block: Block, parent: Block, padding: FlowPosition) => {
  const x = block.x - parent.x + 20;
  const y = padding.y;
  if (x < 0) {
    return {
      arrowPath: `M${parent.x - block.x + 5} 0L${parent.x - block.x + 5} ${
        padding.y / 2
      }L5 ${padding.y / 2}L5 ${y}`,
      pointerPath: `M0 ${y - 5}H10L5 ${y}L0 ${y - 5}Z`,
      x: block.x + block.width / 2 - 5,
      y: parent.y + parent.height,
    };
  }
  return {
    arrowPath: `M20 0L20 ${padding.y / 2}L${x} ${padding.y / 2}L${x} ${y}`,
    pointerPath: `M${x - 5} ${y - 5}H${x + 5}L${x} ${y}L${x - 5} ${y - 5}Z`,
    x: parent.x + parent.width / 2 - 20,
    y: parent.y + parent.height,
  };
};

export const getBlocksWithPositions = (
  blocks: Block[],
  firstBlockPos: FlowPosition,
  padding: FlowPosition
) => {
  const blocksWithPos = [...blocks];
  blocksWithPos.forEach((block) => {
    if (block.parent === -1) {
      block.x = firstBlockPos.x;
      block.y = firstBlockPos.y;
      return;
    }

    const parentBlock = blocksWithPos.find((b) => b.id === block.parent) as Block;
    let usedWidth = 0;
    getBlockChildren(blocksWithPos, parentBlock).forEach((child) => {
      if (child.childWidth > child.width) {
        child.x =
          parentBlock.x -
          parentBlock.childWidth / 2 +
          usedWidth +
          child.childWidth / 2;
        usedWidth += child.childWidth + padding.x;
      } else {
        child.x =
          parentBlock.x - parentBlock.childWidth / 2 + usedWidth + child.width / 2;
        usedWidth += child.width + padding.x;
      }
      child.y =
        parentBlock.y + padding.y + parentBlock.height / 2 + child.height / 2;
      child.arrow = generateArrow(child, parentBlock, padding);
    });
  });
  return blocksWithPos;
};

export const computeAllBlockPos = (
  blocks: Block[],
  firstBlockPos: FlowPosition,
  padding: FlowPosition
) => {
  const newBlocks = produce(blocks, (draftBlocks) => {
    recalcChildrenWidth(draftBlocks, { id: -1 } as Block, padding);
    getBlocksWithPositions(draftBlocks, firstBlockPos, padding);
  });
  return newBlocks;
};

export function getAllChildrenBlocks(
  blocks: Block[],
  parent: { id: number }
): Block[] {
  const children = getBlockChildren(blocks, parent as Block);
  if (children.length === 0) {
    return [];
  } else {
    return [
      ...children,
      ...children.reduce(
        (acc, child) => acc.concat(getAllChildrenBlocks(blocks, { id: child.id })),
        []
      ),
    ];
  }
}
