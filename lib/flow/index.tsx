import React from 'react';
import { FlowBlocks } from '../types';

interface FlowProps {
  blocks: FlowBlocks;
}

const Flow: React.FC<FlowProps> = ({ blocks }: FlowProps) => <div>Hello Flow</div>;

export default Flow;
