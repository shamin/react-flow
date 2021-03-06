# React Flow

[![npm version](https://badge.fury.io/js/%40space-kit%2Freact-flow.svg)](https://badge.fury.io/js/%40space-kit%2Freact-flow)

## Installation

```
npm install --save @space-kit/react-flow
```
## Example
You can test react flowy in this [codesandbox](https://codesandbox.io/s/react-flow-hjpdo?file=/src/App.tsx).

## Documentation

### APIs

- `<FlowProvider />` - Provider to handle all blocks drag and drop
- `<Canvas />` - Canvas where the blocks are drawn
- `<DraggableBlock />` - Make your blocks draggable
- `useFlow` - Hook to get data about the blocks, removeBlock etc.

### FlowProvider

#### Example

```jsx
import { FlowProvider } from '@space-kit/react-flow';

<FlowProvider
  blocks={blocks}
  padding={{ x: 20, y: 80 }}
  arrowColor="#ffffff"
  onBlockSelected={(blockId: string) => {
    console.log('Block selected', blockId);
  }}
  onBlockChange={(blocks: BlockItem[]) => {
    console.log(blocks);
  }}
>
```

#### Props Table

| Prop              | Type                                         | Description                    |
| ----------------- | -------------------------------------------- | ------------------------------ |
| `children`        | `React.ReactElement OR React.ReactElement[]` | Any react children             |
| `blocks`          | `BlockItem[]`                                | Initial blocks                 |
| `padding`         | `FlowPosition`                               | Gap between each blocks        |
| `arrowColor`      | `string`                                     | Color of the arrows            |
| `onBlockSelected` | `(blockId: string) => void`                  | Calls when a block is selected |
| `onBlockChange`   | `(blocks: BlockItem[]) => void`              | Calls when blocks are changed  |

### Canvas

#### Example

```jsx
import { Canvas } from '@space-kit/react-flow';

<Canvas
  style={{
    width: '100%',
    border: '1px solid #000',
    background: '#2f2b2b',
    height: 700,
    overflow: 'scroll',
  }}
/>;
```

#### Props Table

| Prop    | Type                  | Description                             |
| ------- | --------------------- | --------------------------------------- |
| `style` | `React.CSSProperties` | Styles that should be applied to canvas |

### DraggableBlock

#### Example

```jsx
import { DraggableBlock } from '@space-kit/react-flow';

<DraggableBlock
  id="block1"
  draggable
  blockTemplate={({ isActive }) => (
    <DragTemplate data="Block 1" isActive={isActive} />
  )}
  width={100}
  height={60}
>
  Blocks
</DraggableBlock>;
```

#### Props Table

| Prop            | Type                                              | Description                                                                            |
| --------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `id`            | `string`                                          | Unique id for each draggable block. This will be used for rendering template and width |
| `children`      | `React.ReactChild`                                | The block that needs to be dragged                                                     |
| `draggable`     | `boolean`                                         | Is the block draggable                                                                 |
| `clone`         | `boolean`                                         | Does the drag clone the component                                                      |
| `onClick`       | `() => void`                                      | Calls when a draggable is clicked                                                      |
| `blockTemplate` | `(component: ComponentProps) => React.ReactChild` | React component that needs to be rendered in the canvas                                |
| `width`         | `number`                                          | Width of the block                                                                     |
| `height`        | `number`                                          | Height of the block                                                                    |

### useFlow

#### Example

```jsx
import { useFlow } from '@space-kit/react-flow';

const { blocks, removeBlock } = useFlow();
```

| Parameters    | Description                      |
| ------------- | -------------------------------- |
| `blocks`      | Get the blocks that are rendered |
| `removeBlock` | Can be used to remove a block    |
