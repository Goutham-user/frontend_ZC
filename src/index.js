import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import reportWebVitals from './reportWebVitals';
import Router from './Components/Router'

// ReactDOM.render(
//   <React.StrictMode>
//     <Router />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


const container = document.getElementById('root');
const rooterContainer = ReactDOM.createRoot(container);
rooterContainer.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)