import React, { useEffect, useState } from 'react';
import { useDnd } from './provider';

interface DroppableProps {
  id: string;
  children: React.ReactChild;
  offsetHeight: number | string;
  droppable: boolean;
  dropHighlightElement?: (onDropActivate: boolean) => React.ReactNode;
}

export const Droppable: React.FC<DroppableProps> = ({
  id,
  children,
  offsetHeight,
  droppable,
  dropHighlightElement,
}: DroppableProps) => {
  const { drag, setDrop } = useDnd();

  const [dropActivated, setDropActivated] = useState(false);
  useEffect(() => {
    if (!drag) {
      setDropActivated(false);
    }
  }, [drag]);

  const setDropElement = () => {
    if (drag) {
      setDropActivated(true);
      setDrop(id);
    }
  };

  const removeDropElement = () => {
    if (drag) {
      setDropActivated(false);
      setDrop(null);
    }
  };

  return (
    <div
      style={{
        userSelect: 'none',
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {children}
      {droppable && drag && (
        <span
          style={{
            position: 'absolute',
            width: '100%',
            height: offsetHeight,
          }}
          onMouseEnter={setDropElement}
          onMouseLeave={removeDropElement}
          onMouseOver={() => {
            if (!dropActivated) {
              setDropElement();
            }
          }}
        />
      )}
      {dropHighlightElement && dropHighlightElement(dropActivated)}
    </div>
  );
};
