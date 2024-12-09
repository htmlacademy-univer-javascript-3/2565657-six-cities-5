import {Route, Routes} from 'react-router-dom';
import {AppRouter} from './app-router.ts';
import LoginPage from './pages/login-page/login-page.tsx';
import MainPage from './pages/main-page/main-page.tsx';
import FavoritesPage from './pages/favorites-page/favorites-page.tsx';
import OfferPage from './pages/offer-page/offer-page.tsx';
import NotFoundPage from './pages/not-found-page/not-found-page.tsx';
import PrivateRoute from './pages/favorites-page/private-route.tsx';
import {useAppSelector} from '../store';
import {AuthorizationStatus} from './pages/favorites-page/authorization-status.ts';
import LoadingSpinner from '../store/loading-spinner.tsx';
import HistoryRouter from '../store/history-router.tsx';
import browserHistory from '../store/browser-history.ts';
import MainEmptyPage from './pages/main-empty-page/main-empty-page.tsx';

function App() {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const offers = useAppSelector((state) => state.offers);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (<LoadingSpinner />);
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRouter.Main} element={offers.length ? <MainPage /> : <MainEmptyPage />} />
        <Route path={AppRouter.Login} element={<LoginPage />} />
        <Route path={AppRouter.Favorites} element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <FavoritesPage />
          </PrivateRoute>
        }
        />
        <Route path={AppRouter.Offer} element={<OfferPage />}/>
        <Route path={AppRouter.NotFoundPage} element={<NotFoundPage />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
