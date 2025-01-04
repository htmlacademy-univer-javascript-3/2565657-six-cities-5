import FavoriteCard from './favorite-card.tsx';
import {Offer} from '../../../../components/interfaces/offer.ts';
import {useAppSelector} from '../../../../components/store';
import {Link} from 'react-router-dom';
import {AppRouter} from '../../../../components/app-router/app-router.ts';

function FavoriteList() {
  const favoriteOffers = useAppSelector((state) => state.favoritesPageData.favorites);

  return (
    <ul className="favorites__list">
      {favoriteOffers.length
        ? Object.keys(favoriteOffers.reduce<Record<string, Offer[]>>(
          (acc, favoriteOffer) => {
            if (!acc[favoriteOffer.city.name]) {
              acc[favoriteOffer.city.name] = [];
            }
            acc[favoriteOffer.city.name].push(favoriteOffer);
            return acc;
          }, {})).map((cityName) => (
          <li className="favorites__locations-items" key={cityName}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link to={AppRouter.Main} className="locations__item-link">
                  <span>{cityName}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              {favoriteOffers
                .filter((favoriteOffer) => favoriteOffer.city.name === cityName)
                .map((favoriteOffer) =>
                  (<FavoriteCard favoriteOffer={favoriteOffer} key={favoriteOffer.id}/>))}
            </div>
          </li>
        ))
        : (
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Nothing yet saved.</b>
            <p className="favorites__status-description">Save properties to narrow down search or plan your future
                trips.
            </p>
          </div>)}
    </ul>
  );
}

export default FavoriteList;
