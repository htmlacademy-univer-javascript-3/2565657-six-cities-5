import {changeCity} from '../../../store/actions.ts';
import {useAppDispatch} from '../../../store';
import {cities} from '../../../consts/cities.ts';

type CitiesListProps = {
  selectedCity: string;
}

function CitiesList({ selectedCity } : CitiesListProps) {
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => {
        if (city === selectedCity) {
          return (
            <li key={city} className="locations__item">
              <button
                type="button"
                style={{border: 'none'}}
                className="locations__item-link tabs__item tabs__item--active"
              >
                <span>{city}</span>
              </button>
            </li>
          );
        } else {
          return (
            <li key={city} className="locations__item">
              <button
                style={{border: 'none', cursor: 'pointer', background: 'none'}}
                type="button"
                className="locations__item-link tabs__item"
                onClick={() => dispatch(changeCity(city))}
              >
                <span>{city}</span>
              </button>
            </li>
          );
        }
      })}
    </ul>
  );
}

export default CitiesList;
