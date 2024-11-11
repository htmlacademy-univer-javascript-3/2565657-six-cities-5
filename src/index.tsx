import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './react/app.tsx';
import {offers} from './mocks/offers.ts';
import {detailedOffers} from './mocks/detailedOffers.ts';
import {comments} from './mocks/comments.ts';
import {cities} from "./mocks/cities.ts";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={ offers } detailedOffers={detailedOffers} comments={comments} cities={cities}/>
  </React.StrictMode>
);
