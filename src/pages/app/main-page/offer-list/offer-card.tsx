import {Offer} from '../../../../components/interfaces/offer.ts';
import {fetchChangeFavoriteStatus} from '../../../../components/store/actions/api-actions.ts';
import {useAppDispatch, useAppSelector} from '../../../../components/store';
import {AuthorizationStatus} from '../../../../components/enums/authorization-status.ts';
import {Link, useNavigate} from 'react-router-dom';
import {AppRouter} from '../../../../components/app-router/app-router.ts';

type OfferCardProps = {
  offer: Offer;
  handleMouseOver: (value: string) => void;
  handleMouseOut: () => void;
}

function OfferCard({ offer, handleMouseOver, handleMouseOut} : OfferCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);

  const handleChangeFavoriteStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRouter.Login);
    }

    const newStatus = offer.isFavorite ? 0 : 1;

    dispatch(fetchChangeFavoriteStatus({ id: offer.id, status: newStatus }));
  };

  return (
    <article
      className='cities__card place-card'
      onMouseOver={() => handleMouseOver(offer.id)}
      onMouseOut={handleMouseOut}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className='cities__image-wrapper place-card__image-wrapper'>
        <Link key={offer.id} to={`/offers/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={handleChangeFavoriteStatus}
            className={offer.isFavorite
              ? 'place-card__bookmark-button place-card__bookmark-button--active button'
              : 'place-card__bookmark-button button'}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${20 * offer.rating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <p>{offer.title}</p>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
