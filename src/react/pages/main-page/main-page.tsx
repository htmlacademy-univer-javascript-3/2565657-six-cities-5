import OffersList from '../../general-components/offers-list.tsx';
import {useState} from 'react';
import {City} from '../../../interfaces/city.ts';
import Map from '../../general-components/map.tsx';
import {Point} from '../../../interfaces/point.ts';
import {Offer} from '../../../interfaces/offer.ts';
import {AppRouter} from '../../routing/app-router.ts';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../../store';
import CitiesList from './cities-list.tsx';

type MainPageProps = {
  offers: Offer[];
  cities: City[];
}

function MainPage({ offers, cities } : MainPageProps) {
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);

  const selectedCity = useAppSelector((state) => state.city);
  const filteredOffers = useAppSelector((state) => state.offers);

  return (
    <body>
      <div className="page page--gray page--main">
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
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">3</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesList offers={offers} cities={cities} selectedCity={selectedCity}/>
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{selectedCity.points.length} places to stay in {selectedCity.name}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                  Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <OffersList
                  isNearbyOffersList={false}
                  offers={filteredOffers}
                  setSelectedPoint={setSelectedPoint}
                />
              </section>
              <div className="cities__right-section" style={{ textAlign: 'center' }}>
                <section className="offer__map map" >
                  <Map city={selectedCity} points={selectedCity.points} selectedPoint={selectedPoint}/>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </body>
  );
}
export default MainPage;
