import {Link, Navigate, useParams} from 'react-router-dom';
import {DetailedOffer} from '../../../interfaces/detailed-offer.ts';
import {AppRouter} from '../../routing/app-router.ts';
import CommentForm from './comment-form.tsx';
import {Review} from '../../../interfaces/review.ts';
import ReviewsList from './reviews-list/reviews-list.tsx';
import Map from '../../general-components/map.tsx';
import {useState} from 'react';
import {Point} from '../../../interfaces/point.ts';
import OffersList from '../../general-components/offers-list.tsx';

type OfferPageProps = {
  detailedOffers: DetailedOffer[];
  reviews: Review[];
}

function OfferPage({ detailedOffers, reviews } : OfferPageProps) {
  const { id } = useParams();
  const selectedDetailedOffer = detailedOffers.find((detailedOffer) => detailedOffer.id === id);
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);

  if (!selectedDetailedOffer) {
    return (<Navigate to={AppRouter.NotFoundPage} />);
  }

  const nearbyDetailedOffers = detailedOffers.filter((offer) =>
    offer.id !== selectedDetailedOffer.id &&
    offer.city.name === selectedDetailedOffer.city.name);

  return (
    <body>
      <div className="page">
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

        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {selectedDetailedOffer.images.map((image, index) =>
                  (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index} className="offer__image-wrapper">
                      <img className="offer__image" src={image} alt="Photo studio"></img>
                    </div>
                  ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {selectedDetailedOffer?.isPremium && (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>)}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {selectedDetailedOffer?.title}
                  </h1>
                  <button className="offer__bookmark-button button" type="button">
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: `${(20 * selectedDetailedOffer.rating)}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{selectedDetailedOffer?.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {selectedDetailedOffer?.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {selectedDetailedOffer?.bedrooms}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {selectedDetailedOffer?.maxAdults}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">{selectedDetailedOffer?.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {selectedDetailedOffer.goods.map((good, index) =>
                      (
                        // eslint-disable-next-line react/no-array-index-key
                        <li key={index} className="offer__inside-item">
                          {good}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="offer__avatar user__avatar"
                        src={selectedDetailedOffer?.host.avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      >
                      </img>
                    </div>
                    <span className="offer__user-name">
                      {selectedDetailedOffer?.host.name}
                    </span>
                    {selectedDetailedOffer?.host.isPro &&
                      <span className="offer__user-status">
                        Pro
                      </span>}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {selectedDetailedOffer?.description}
                    </p>
                  </div>
                </div>
                <section className="offer__reviews detailedOffers"> {/*ПОСМОТРЕТЬ*/}
                  <h2 className="reviews__title">Reviews &middot;
                    <span className="reviews__amount">
                      {reviews.length}
                    </span>
                  </h2>
                  <ReviewsList reviews={reviews} />
                  <CommentForm />
                </section>
              </div>
            </div>
            <section className="offer__map map">
              <Map city={selectedDetailedOffer.city}
                points={selectedDetailedOffer.city.points.filter((point) =>
                  point.offerId !== selectedDetailedOffer.id)} selectedPoint={selectedPoint}
              />
            </section>
          </section>
          <OffersList
            isNearbyOffersList
            offers={nearbyDetailedOffers}
            setSelectedPoint={setSelectedPoint}
          />
        </main>
      </div>
    </body>
  );
}

export default OfferPage;
