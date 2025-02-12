import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CVFSurvey from './App';
import reportWebVitals from './reportWebVitals';
import AllSubmissionsScreen from './AllSubmissionScreen';
import UsersVital from './UsersVital.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AllSubmissionsScreen />
    <UsersVital />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
