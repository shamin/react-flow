import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept();
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
