import {Offer} from '../../interfaces/offer.ts';
import {useState} from 'react';
import {useAppDispatch} from '../../store';
import {getToken} from '../../api/token.ts';
import {setError} from '../../store/actions.ts';
import {ApiRouter} from '../../api/api-router.ts';

type OfferCardProps = {
  isNearbyOfferCard: boolean;
  offer: Offer;
  handleMouseOver: (value: string) => void;
  handleMouseOut: () => void;
}

function OfferCard({ isNearbyOfferCard, offer, handleMouseOver, handleMouseOut} : OfferCardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(offer.isFavorite);

  const dispatch = useAppDispatch();
  const token = getToken();

  const handleSetFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsFavorite((prev) => !prev);
    const newStatus = isFavorite ? 1 : 0;

    const path = `${ApiRouter.BasePath}${ApiRouter.ChangeFavoriteStatus}${offer.id}/${newStatus}`;

    fetch(path, {
      method: 'POST',
      headers: {
        'x-token': `${token}`,
      },
    })
      .then((response) => response)
      .catch((err: string) =>
        dispatch(setError(err))
      );
  };

  return (
    <article
      className={isNearbyOfferCard ? 'near-places__card place-card' : 'cities__card place-card'}
      onMouseOver={() => handleMouseOver(offer.id)}
      onMouseOut={handleMouseOut}
    >
      {!isNearbyOfferCard && offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${isNearbyOfferCard ? 'near-places__card place-card' : 'cities__image-wrapper'} place-card__image-wrapper`}>
        <img
          className="place-card__image"
          src={offer.previewImage}
          width="260"
          height="200"
          alt="Place image"
        />
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={handleSetFavorite} style={{ background: 'none', border: 'none' }} className={isFavorite ? 'place-card__bookmark-button--active' : 'place-card__bookmark-button button'} type="submit">
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
          <a href="#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
