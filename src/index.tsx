import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';

import './index.scss';
import { App } from './App';
// import { AuthContext } from './components/Auth/AuthContext';

// const Root = () => (
//   // <AuthContext>
//   <App />
//   // </AuthContext>
// );

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
