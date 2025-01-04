import {Offer} from '../../../../components/interfaces/offer.ts';
import {Link} from 'react-router-dom';
import {fetchChangeFavoriteStatus} from '../../../../components/store/actions/api-actions.ts';
import {useAppDispatch} from '../../../../components/store';

type FavoriteCardProps = {
  favoriteOffer: Offer;
}
function FavoriteCard({ favoriteOffer } : FavoriteCardProps) {
  const dispatch = useAppDispatch();

  const handleChangeFavoriteStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const newStatus = favoriteOffer.isFavorite ? 0 : 1;

    dispatch(fetchChangeFavoriteStatus({ id: favoriteOffer.id, status: newStatus }));
  };

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link key={favoriteOffer.id} to={`/offers/${favoriteOffer.id}`}>
          <img className="place-card__image" src={favoriteOffer.previewImage} width="150" height="110"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{favoriteOffer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={handleChangeFavoriteStatus}
            className={!favoriteOffer.isFavorite
              ? 'place-card__bookmark-button button'
              : 'place-card__bookmark-button place-card__bookmark-button--active button'}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${20 * favoriteOffer.rating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <p>{favoriteOffer.title}</p>
        </h2>
        <p className="place-card__type">{favoriteOffer.type}</p>
      </div>
    </article>
  );
}

export default FavoriteCard;
