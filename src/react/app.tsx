import MainPage from './main-page/main-page.tsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './login-page/login-page.tsx';
import FavoritesPage from './favorites-page/favorites-page.tsx';
import NotFoundPage from './not-found-page/NotFoundPage.tsx';
import OfferPage from './offer-page/offer-page.tsx';
import PrivateRoute from './favorites-page/PrivateRoute.tsx';

function App(props: { offerCount: number }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<MainPage offerCount={ props.offerCount } />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/favorites'} element={
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        }
        />
        <Route path={'/offer/:id'} element={<OfferPage />} />
        <Route path={'*'} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
