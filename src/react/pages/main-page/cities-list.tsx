import {changeCity, fillOffersList} from '../../../store/action.ts';
import {City} from '../../../interfaces/city.ts';
import {useAppDispatch} from '../../../store';
import {Offer} from '../../../interfaces/offer.ts';

type CitiesListProps = {
  offers: Offer[];
  cities: City[];
  selectedCity: City;
}

function CitiesList({ offers, cities, selectedCity } : CitiesListProps) {
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => {
        if (city === selectedCity) {
          return (
            <li key={city.name} className="locations__item">
              <button
                type="button"
                style={{border: 'none'}}
                className="locations__item-link tabs__item tabs__item--active"
              >
                <span>{city.name}</span>
              </button>
            </li>
          );
        } else {
          return (
            <li key={city.name} className="locations__item">
              <button
                style={{border: 'none', cursor: 'pointer', background: 'none'}}
                type="button"
                className="locations__item-link tabs__item"
                onClick={() => {
                  dispatch(changeCity(city));
                  dispatch(fillOffersList(offers.filter(
                    (offer) => offer.city.name === city.name)));
                }}
              >
                <span>{city.name}</span>
              </button>
            </li>
          );
        }
      })}
    </ul>
  );
}

export default CitiesList;
