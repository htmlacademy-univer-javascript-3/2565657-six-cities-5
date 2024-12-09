import OffersList from '../../general-components/offers-list.tsx';
import {useEffect, useState} from 'react';
import Map from '../../general-components/map.tsx';
import {Point} from '../../../interfaces/point.ts';
import {Offer} from '../../../interfaces/offer.ts';
import {AppRouter} from '../../app-router.ts';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../store';
import CitiesList from './cities-list.tsx';
import SortingOptions from './sorting-options/sorting-options.tsx';
import {SortingOptionEnum} from './sorting-options/sorting-option-enum.ts';
import {AuthorizationStatus} from '../favorites-page/authorization-status.ts';
import {logoutAction} from '../../../store/api-actions.ts';
import LoadingSpinner from '../../../store/loading-spinner.tsx';

function MainPage() {
  const dispatch = useAppDispatch();
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [currentSortedOption, setCurrentSortedOption] = useState<SortingOptionEnum>(SortingOptionEnum.Popular);
  const [cityOffers, setCityOffers] = useState<Offer[]>([]);
  const [sortedCityOffers, setSortedCityOffers] = useState<Offer[]>([]);

  const offers = useAppSelector((state) => state.offers);
  const selectedCity = useAppSelector((state) => state.city);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  useEffect(() => {
    setCityOffers(offers.filter((offer) => offer.city.name === selectedCity));
  }, [offers, selectedCity]);

  useEffect(() => {
    switch (currentSortedOption) {
      case SortingOptionEnum.Popular:
        setSortedCityOffers(cityOffers);
        break;
      case SortingOptionEnum.PriceLowToHigh:
        setSortedCityOffers(cityOffers.slice().sort((a, b) => a.price - b.price));
        break;
      case SortingOptionEnum.PriceHighToLow:
        setSortedCityOffers(cityOffers.slice().sort((a, b) => b.price - a.price));
        break;
      case SortingOptionEnum.TopRatedFirst:
        setSortedCityOffers(cityOffers.slice().sort((a, b) => b.rating - a.rating));
        break;
      default:
        break;
    }
  }, [currentSortedOption, cityOffers]);

  const cityOffersPoints = cityOffers.map((cityOffer) => {
    const offerPoint: Point = {
      offerId: cityOffer.id,
      longitude: cityOffer.location.longitude,
      latitude: cityOffer.location.latitude
    };

    return offerPoint;
  });

  return (
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
                  {authorizationStatus !== AuthorizationStatus.Auth
                    ?
                    <Link className="header__nav-link" to={AppRouter.Login}>
                      <span className="header__signout">Sign in</span>
                    </Link>
                    :
                    <Link
                      onClick={() => dispatch(logoutAction())}
                      className="header__nav-link"
                      to={AppRouter.Main}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>}
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
            <CitiesList selectedCity={selectedCity}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cityOffers.length} places to stay in {selectedCity}</b>
              <SortingOptions
                currentSortedOption={currentSortedOption}
                setCurrentSortedOption={setCurrentSortedOption}
              />
              <OffersList
                isNearbyOffersList={false}
                offers={sortedCityOffers}
                setSelectedPoint={setSelectedPoint}
              />
            </section>
            <div className="cities__right-section" style={{ textAlign: 'center' }}>
              <section className="cities__map map" style={{ background: 'white' }}>
                {cityOffers.length
                  ? <Map cityLocation={cityOffers[0].city.location} points={cityOffersPoints} selectedPoint={selectedPoint}/>
                  : <LoadingSpinner />}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default MainPage;
