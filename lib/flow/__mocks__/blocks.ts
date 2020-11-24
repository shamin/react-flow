import { BlockItem } from '../../types';

export const mockBlocks: BlockItem[] = [
  {
    parent: -1,
    id: 0,
    name: 'block2',
    type: 'block2',
    width: 100,
    height: 60,
  },
  {
    parent: 0,
    id: 1,
    name: 'block3',
    type: 'block3',
    width: 100,
    height: 60,
  },
  {
    parent: 0,
    id: 2,
    name: 'block1',
    type: 'block1',
    width: 100,
    height: 60,
  },
  {
    parent: 1,
    id: 3,
    name: 'block3',
    type: 'block3',
    width: 100,
    height: 60,
  },
  {
    parent: 1,
    id: 4,
    name: 'block1',
    type: 'block1',
    width: 100,
    height: 60,
  },
  {
    parent: 3,
    id: 5,
    name: 'block2',
    type: 'block2',
    width: 100,
    height: 60,
  },
  {
    parent: 3,
    id: 6,
    name: 'block3',
    type: 'block3',
    width: 150,
    height: 60,
  },
];

export const mockPadding = { x: 20, y: 80 };

export const mockFirstBlockPos = { x: 0, y: 0 };
