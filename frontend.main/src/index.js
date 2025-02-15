import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CVFSurvey from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResponseDetails from './ResponseDetails';
import reportWebVitals from './reportWebVitals';
import AllSubmissionsScreen from './AllSubmissionScreen';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<CVFSurvey />} />
        <Route path="/submissions" element={<AllSubmissionsScreen />} />
        <Route path="/submission/:id" element={<ResponseDetails />} /> {/* Add this route */}

      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
