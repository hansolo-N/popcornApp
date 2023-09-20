import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Rating from './components/rating/Rating';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Rating numStars={5} messages ={['horrible','ok','good','great','amazing']} className='' defaultRating={0} onSetRating/>
  </React.StrictMode>
);
