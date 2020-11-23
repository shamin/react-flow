export type StringOrNull = string | null;

export interface FlowBlocks {}

export interface FlowPosition {
  x: number;
  y: number;
}

export interface BlockItem {
  parent: number;
  id: number;
  name: string;
  type: string;
  width: number;
  height: number;
}

export interface Block {
  childWidth: number;
  parent: number;
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  arrow: any;
  name: string;
  type: string;
}
