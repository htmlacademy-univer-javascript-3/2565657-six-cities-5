import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AppRouter} from './routing/app-router.ts';
import LoginPage from './pages/login-page/login-page.tsx';
import MainPage from './pages/main-page/main-page.tsx';
import FavoritesPage from './pages/favorites-page/favorites-page.tsx';
import OfferPage from './pages/offer-page/offer-page.tsx';
import NotFoundPage from './pages/not-found-page/not-found-page.tsx';
import {DetailedOffer} from '../interfaces/detailed-offer.ts';
import {Review} from '../interfaces/review.ts';
import PrivateRoute from './pages/favorites-page/private-route.tsx';
import {City} from '../interfaces/city.ts';

type AppProps = {
  detailedOffers: DetailedOffer[];
  comments: Review[];
  cities: City[];
}

function App({ detailedOffers, comments, cities } : AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRouter.Main} element={<MainPage offers={detailedOffers} cities={cities} />} />
        <Route path={AppRouter.Login} element={<LoginPage />} />
        <Route path={AppRouter.Favorites} element={
          <PrivateRoute>
            <FavoritesPage favoriteOffers={detailedOffers.filter((detailedOffer) => detailedOffer.isFavorite)} />
          </PrivateRoute>
        }
        />
        <Route path={AppRouter.Offer} element={<OfferPage detailedOffers={detailedOffers} reviews={comments}/>}/>
        <Route path={AppRouter.NotFoundPage} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
