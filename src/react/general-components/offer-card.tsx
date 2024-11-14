import {Offer} from '../../interfaces/offer.ts';

type OfferCardProps = {
  isNearbyOfferCard: boolean;
  offer: Offer;
  handleMouseOver: (value: string) => void;
  handleMouseOut: () => void;
}

function OfferCard({ isNearbyOfferCard, offer, handleMouseOver, handleMouseOut} : OfferCardProps) {
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
        <a href="#">
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
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
