import {Link} from 'react-router-dom';
import {AppRouter} from '../../../components/app-router/app-router.ts';
import {useAppDispatch} from '../../../components/store';
import {logoutAction} from '../../../components/store/actions/api-actions.ts';
import FavoriteList from './favorite-list/favorite-list.tsx';
import {clearFavorites} from '../../../components/store/actions/app-actions.ts';

function FavoritesPage() {
  const dispatch = useAppDispatch();

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRouter.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"></img>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item">
                  <Link
                    onClick={() => {
                      dispatch(logoutAction());
                      dispatch(clearFavorites());
                    }}
                    className="header__nav-link"
                    to={AppRouter.Main}
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoriteList />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link to={AppRouter.Main} className="footer__logo-link">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"></img>
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
