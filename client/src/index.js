import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import store from './Redux/Store'
import reportWebVitals from './reportWebVitals';

// pi-dogs-main-git-deploy-faramir07.vercel.app

export const axiosURL =
  process.env.REACT_APP_API ||
  "https://pi-dogs-main-production-48a2.up.railway.app"||
  "http://localhost:3000";

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
