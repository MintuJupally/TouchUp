/*global chrome*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const rootElement = document.createElement('root');
// rootElement.id = 'react-chrome-app';
// const alreadyPresent = document.getElementById(rootElement.id);
// if (alreadyPresent) {
//   alreadyPresent.remove();
// } else {
//   document.body.appendChild(rootElement);

//   const root = ReactDOM.createRoot(rootElement);
//   root.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// }

const alerter = () => {
  alert('Koushik - ' + count);
};

let flag = false;
let count = 2;

console.log('hello from extension');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  flag = !flag;
  count += 2;

  if (request.method === 'ping') {
    if (flag) document.addEventListener('click', alerter);
    else document.removeEventListener('click', alerter);
    sendResponse({ data: 'pong' });
  } else sendResponse({});
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
