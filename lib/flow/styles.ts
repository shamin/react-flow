const el = document.createElement('style');
el.type = 'text/css';

const head = document.querySelector('head');
head.appendChild(el);

const setStyle = (newStyles: string) => {
  el.innerHTML = newStyles;
};

export const setDraggingStyles = () => {
  setStyle(`
    body {
      cursor: grabbing;
    }
`);
};

export const setNotDraggingStyles = () => {
  setStyle(`
    [data-react-flow-draggable], [data-react-flow-draggable-flow] {
      cursor: grab;
    }
  `);
};
