import OfferList from './offer-list/offer-list.tsx';
import {useEffect, useState} from 'react';
import Map from '../../../components/map/map.tsx';
import {Point} from '../../../components/interfaces/point.ts';
import {Offer} from '../../../components/interfaces/offer.ts';
import {AppRouter} from '../../../components/app-router/app-router.ts';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../components/store';
import CitiesList from './cities-list.tsx';
import SortingOptions from './sorting-options/sorting-options.tsx';
import {SortingOption} from '../../../components/enums/sorting-option.ts';
import {AuthorizationStatus} from '../../../components/enums/authorization-status.ts';
import {logoutAction} from '../../../components/store/actions/api-actions.ts';
import LoadingSpinner from '../../../components/loading-spinner/loading-spinner.tsx';

function MainPage() {
  const dispatch = useAppDispatch();
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [currentSortedOption, setCurrentSortedOption] = useState<SortingOption>(SortingOption.Popular);
  const [cityOffers, setCityOffers] = useState<Offer[]>([]);
  const [sortedCityOffers, setSortedCityOffers] = useState<Offer[]>([]);

  const offers = useAppSelector((state) => state.mainPageData.offers);
  const selectedCity = useAppSelector((state) => state.mainPageData.city);
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const favorites = useAppSelector((state) => state.favoritesPageData.favorites);

  useEffect(() => {
    setCityOffers(offers.filter((offer) => offer.city.name === selectedCity));
  }, [offers, selectedCity]);

  useEffect(() => {
    switch (currentSortedOption) {
      case SortingOption.Popular:
        setSortedCityOffers(cityOffers);
        break;
      case SortingOption.PriceLowToHigh:
        setSortedCityOffers(cityOffers.slice().sort((a, b) => a.price - b.price));
        break;
      case SortingOption.PriceHighToLow:
        setSortedCityOffers(cityOffers.slice().sort((a, b) => b.price - a.price));
        break;
      case SortingOption.TopRatedFirst:
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
                  {authorizationStatus === AuthorizationStatus.Auth &&
                    <Link className="header__nav-link header__nav-link--profile" to={AppRouter.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">{favorites.length}</span>
                    </Link>}
                </li>
                <li className="header__nav-item">
                  {authorizationStatus !== AuthorizationStatus.Auth
                    ?
                    <Link className="header__nav-link" to={AppRouter.Login}>
                      <span className="header__signout">Sign in</span>
                    </Link>
                    :
                    <Link
                      onClick={() => {
                        dispatch(logoutAction());
                      }}
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
              <OfferList
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
