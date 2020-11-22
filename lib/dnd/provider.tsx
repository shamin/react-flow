import React, { useContext, useState } from 'react';
import { FlowPosition, StringOrNull } from '../types';

interface DndContextType {
  drag: StringOrNull;
  drop: StringOrNull;
  setDrag: (value: StringOrNull) => void;
  setDrop: (dropId: StringOrNull) => void;
  onDrop: (dropPosition: FlowPosition) => void;
}

const DndContext = React.createContext<DndContextType>({} as DndContextType);
export const useDnd = () => useContext(DndContext);

interface DndProviderProps {
  children: React.ReactElement | React.ReactElement[];
  onDrop: (
    drag: StringOrNull,
    drop: StringOrNull,
    dropPosition: FlowPosition
  ) => void;
}

export const DndProvider = ({ children, onDrop }: DndProviderProps) => {
  const [drag, setDrag] = useState<StringOrNull>(null);
  const [drop, setDrop] = useState<StringOrNull>(null);

  const onSetDrag = (value: StringOrNull) => {
    setDrag(value);
  };

  const onSetDrop = (value: StringOrNull) => {
    setDrop(value);
  };

  const dropAndCleanUp = (dropPosition: FlowPosition) => {
    onDrop(drag, drop, dropPosition);
    setDrag(null);
    setDrop(null);
  };

  return (
    <DndContext.Provider
      value={{
        drag,
        drop,
        setDrag: onSetDrag,
        setDrop: onSetDrop,
        onDrop: dropAndCleanUp,
      }}
    >
      {children}
    </DndContext.Provider>
  );
};
