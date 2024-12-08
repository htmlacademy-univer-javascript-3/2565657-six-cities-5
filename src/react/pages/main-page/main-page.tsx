import OffersList from '../../general-components/offers-list.tsx';
import {useEffect, useState} from 'react';
import {City} from '../../../interfaces/city.ts';
import Map from '../../general-components/map.tsx';
import {Point} from '../../../interfaces/point.ts';
import {Offer} from '../../../interfaces/offer.ts';
import {AppRouter} from '../../routing/app-router.ts';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../store';
import CitiesList from './cities-list.tsx';
import SortingOptions from './sorting-options/sorting-options.tsx';
import {SortingOptionEnum} from './sorting-options/sorting-option-enum.ts';
import {fillCityOffersList, fillSortedOffersList} from '../../../store/action.ts';

type MainPageProps = {
  offers: Offer[];
  cities: City[];
}

function MainPage({ offers, cities } : MainPageProps) {
  const dispatch = useAppDispatch();
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [currentSortedOption, setCurrentSortedOption] = useState<SortingOptionEnum>(SortingOptionEnum.Popular);

  const selectedCity = useAppSelector((state) => state.city);
  const selectedOffers = useAppSelector((state) => state.selectedOffers);
  const sortedOffers = useAppSelector((state) => state.sortedOffers);

  useEffect(() => {
    dispatch(fillCityOffersList(offers.filter((offer) => offer.city.name === selectedCity.name)));
  }, [offers, selectedCity]);

  useEffect(() => {
    switch (currentSortedOption) {
      case SortingOptionEnum.Popular:
        dispatch(fillSortedOffersList(selectedOffers));
        break;
      case SortingOptionEnum.PriceLowToHigh:
        dispatch(fillSortedOffersList(selectedOffers.slice().sort((a, b) => a.price - b.price)));
        break;
      case SortingOptionEnum.PriceHighToLow:
        dispatch(fillSortedOffersList(selectedOffers.slice().sort((a, b) => b.price - a.price)));
        break;
      case SortingOptionEnum.TopRatedFirst:
        dispatch(fillSortedOffersList(selectedOffers.slice().sort((a, b) => b.rating - a.rating)));
        break;
      default:
        break;
    }
  }, [currentSortedOption, selectedOffers]);

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
              <CitiesList cities={cities} selectedCity={selectedCity} />
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{selectedCity.points.length} places to stay in {selectedCity.name}</b>
                <SortingOptions
                  currentSortedOption={currentSortedOption}
                  setCurrentSortedOption={setCurrentSortedOption}
                />
                <OffersList
                  isNearbyOffersList={false}
                  offers={sortedOffers}
                  setSelectedPoint={setSelectedPoint}
                />
              </section>
              <div className="cities__right-section" style={{ textAlign: 'center' }}>
                <section className="cities__map map" >
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
