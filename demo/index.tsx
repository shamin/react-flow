import React from 'react';
import ReactDOM from 'react-dom';

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept();
  }
}

const App = () => <div>Hello World</div>;

ReactDOM.render(<App />, document.getElementById('app'));
