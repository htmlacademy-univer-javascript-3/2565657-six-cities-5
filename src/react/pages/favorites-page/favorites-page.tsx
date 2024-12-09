import FavoriteCard from './favorite-card.tsx';
import {Offer} from '../../../interfaces/offer.ts';
import {Link} from 'react-router-dom';
import {AppRouter} from '../../app-router.ts';
import {useAppDispatch} from '../../../store';
import {useEffect, useState} from 'react';
import {ApiRouter} from '../../../api/api-router.ts';
import {setError} from '../../../store/actions.ts';
import {getToken} from '../../../api/token.ts';
import {logoutAction} from '../../../store/api-actions.ts';

function FavoritesPage() {
  const [favoriteOffers, setFavoritesOffers] = useState<Offer[]>([]);

  const dispatch = useAppDispatch();
  const token = getToken();

  useEffect(() => {
    const path = `${ApiRouter.BasePath}${ApiRouter.Favorites}`;

    fetch(path, {
      method: 'GET',
      headers: {
        'x-token': `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data: Offer[]) => setFavoritesOffers(data))
      .catch((err: string) =>
        dispatch(setError(err))
      );
  }, []);

  const groupedByPlace = favoriteOffers.reduce<Record<string, Offer[]>>(
    (acc, favoriteOffer) => {
      if (!acc[favoriteOffer.city.name]) {
        acc[favoriteOffer.city.name] = [];
      }
      acc[favoriteOffer.city.name].push(favoriteOffer);
      return acc;
    }, {});

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
                    onClick={() => dispatch(logoutAction())}
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
            <ul className="favorites__list">
              {Object.keys(groupedByPlace).map((cityName) => (
                <li className="favorites__locations-items" key={cityName}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{cityName}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favoriteOffers
                      .filter((favoriteOffer) => favoriteOffer.city.name === cityName)
                      .map((favoriteOffer) =>
                        (
                          <Link key={favoriteOffer.id} to={ `/offer/${favoriteOffer.id}` }>
                            <FavoriteCard favoriteOffer={favoriteOffer} key={favoriteOffer.id}/>
                          </Link>
                        ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"></img>
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
