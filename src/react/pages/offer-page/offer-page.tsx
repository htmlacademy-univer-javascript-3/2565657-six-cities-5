import {Link, useParams} from 'react-router-dom';
import {AppRouter} from '../../app-router.ts';
import CommentForm from './comment-form.tsx';
import ReviewsList from './reviews-list/reviews-list.tsx';
import Map from '../../general-components/map.tsx';
import {useEffect, useState} from 'react';
import {Point} from '../../../interfaces/point.ts';
import OffersList from '../../general-components/offers-list.tsx';
import {Offer} from '../../../interfaces/offer.ts';
import {useAppDispatch} from '../../../store';
import {ApiRouter} from '../../../api/api-router.ts';
import {setError} from '../../../store/actions.ts';
import {DetailedOffer} from '../../../interfaces/detailed-offer.ts';
import {Comment} from '../../../interfaces/comment.ts';
import LoadingSpinner from '../../../store/loading-spinner.tsx';
import {getToken} from '../../../api/token.ts';

function OfferPage() {
  const { id } = useParams();

  const [nearbyOffers, setNearbyOffers] = useState<Offer[]>([]);

  const [selectedDetailedOffer, setSelectedDetailedOffer] = useState<DetailedOffer | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);

  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const token = getToken();

  useEffect(() => {
    const path = `${ ApiRouter.BasePath }${ ApiRouter.Offer }${id}`;

    fetch(path, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data: DetailedOffer) => setSelectedDetailedOffer(data))
      .catch((err: string) =>
        dispatch(setError(err))
      );
  }, [id]);

  useEffect(() => {
    const path = `${ ApiRouter.BasePath }${ ApiRouter.Offer }${id}/nearby`;

    fetch(path, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data: Offer[]) => setNearbyOffers(data))
      .catch((err: string) =>
        dispatch(setError(err))
      );
  }, [id]);

  useEffect(() => {
    const path = `${ ApiRouter.BasePath }${ ApiRouter.Comment }${id}`;

    fetch(path, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data: Comment[]) => setComments(data))
      .catch((err: string) =>
        dispatch(setError(err))
      );
  }, [id]);

  if (!selectedDetailedOffer) {
    return <LoadingSpinner />;
  }

  const nearbyPoints = nearbyOffers.slice(0, 3).map((nearbyOffer) => {
    const offerPoint: Point = {
      offerId: nearbyOffer.id,
      longitude: nearbyOffer.location.longitude,
      latitude: nearbyOffer.location.latitude
    };

    return offerPoint;
  });

  return (
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
              {selectedDetailedOffer?.images.map((image) =>
                (
                  <div key={image} className="offer__image-wrapper">
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
                  <span style={{width: `${(20 * selectedDetailedOffer?.rating)}%`}}></span>
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
                  {selectedDetailedOffer?.goods.map((good) =>
                    (
                      <li key={good} className="offer__inside-item">
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
                    {comments.length}
                  </span>
                </h2>
                <ReviewsList comments={comments} />
                <CommentForm />
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map cityLocation={selectedDetailedOffer.city.location}
              points={nearbyPoints} selectedPoint={selectedPoint}
            />
          </section>
        </section>
        <OffersList
          isNearbyOffersList
          offers={nearbyOffers}
          setSelectedPoint={setSelectedPoint}
        />
      </main>
    </div>
  );
}

export default OfferPage;
