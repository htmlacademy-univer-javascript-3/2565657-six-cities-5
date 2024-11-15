import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './react/app.tsx';
import {offers} from './mocks/offers.ts';
import {detailedOffers} from './mocks/detailedOffers.ts';
import {reviews} from './mocks/reviews.ts';
import {cities} from './mocks/cities.ts';
import {Provider} from "react-redux";
import {store} from "./store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={ offers } detailedOffers={detailedOffers} comments={reviews} cities={cities}/>
    </Provider>
  </React.StrictMode>
);
