import {Route, Routes} from 'react-router-dom';
import {AppRouter} from '../../components/app-router/app-router.ts';
import {useAppDispatch, useAppSelector} from '../../components/store';
import {AuthorizationStatus} from '../../components/enums/authorization-status.ts';
import browserHistory from '../../components/store/browser-history.ts';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.tsx';
import LoginPage from './login-page/login-page.tsx';
import MainPage from './main-page/main-page.tsx';
import MainEmptyPage from './main-empty-page/main-empty-page.tsx';
import PrivateRoute from '../../hocs/private-route.tsx';
import FavoritesPage from './favorites-page/favorites-page.tsx';
import OfferPage from './offer-page/offer-page.tsx';
import NotFoundPage from './not-found-page/not-found-page.tsx';
import HistoryRouter from '../../hocs/history-router.tsx';
import {checkAuthAction, fetchFavoritesAction, fetchOffersAction} from '../../components/store/actions/api-actions.ts';
import {useEffect, useState} from 'react';

function App() {
  const dispatch = useAppDispatch();

  const [isDataReceived, setIsDataReceived] = useState<number>(0);

  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const offers = useAppSelector((state) => state.mainPageData.offers);

  useEffect(() => {
    dispatch(fetchOffersAction()).finally(() => setIsDataReceived((prev) => prev + 1));
    dispatch(checkAuthAction()).finally(() => setIsDataReceived((prev) => prev + 1));
    dispatch(fetchFavoritesAction()).finally(() => setIsDataReceived((prev) => prev + 1));
  }, [dispatch]);

  return (authorizationStatus === AuthorizationStatus.Unknown || isDataReceived !== 6)
    ? (<LoadingSpinner />)
    : (
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRouter.Main} element={offers.length ? <MainPage /> : <MainEmptyPage />} />
          <Route path={AppRouter.Login} element={authorizationStatus === AuthorizationStatus.Auth ? <MainPage /> : <LoginPage />} />
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
