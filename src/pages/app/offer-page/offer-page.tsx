import {Link, useNavigate, useParams} from 'react-router-dom';
import CommentForm from './comment-form.tsx';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../components/store';
import LoadingSpinner from '../../../components/loading-spinner/loading-spinner.tsx';
import {Point} from '../../../components/interfaces/point.ts';
import {AppRouter} from '../../../components/app-router/app-router.ts';
import {AuthorizationStatus} from '../../../components/enums/authorization-status.ts';
import {
  fetchChangeFavoriteStatus,
  fetchOfferPageDataAction,
  logoutAction
} from '../../../components/store/actions/api-actions.ts';
import CommentList from './comment-list/comment-list.tsx';
import Map from '../../../components/map/map.tsx';
import NotFoundPage from '../not-found-page/not-found-page.tsx';
import NearbyOfferList from './nearby-offer-list/nearby-offer-list.tsx';

function OfferPage() {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const selectedDetailedOffer = useAppSelector((state) => state.offerPageData.detailedOffer);
  const comments = useAppSelector((state) => state.offerPageData.comments);
  const nearbyOffers = useAppSelector((state) => state.offerPageData.nearbyOffers);
  const favorites = useAppSelector((state) => state.favoritesPageData.favorites);

  const [isDataReceived, setIsDataReceived] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferPageDataAction(id)).finally(() => {
        setIsDataReceived(true);
      });
    }
  }, [dispatch, id]);

  const handleChangeFavoriteStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRouter.Login);
    }

    const newStatus = selectedDetailedOffer!.isFavorite ? 0 : 1;

    dispatch(fetchChangeFavoriteStatus({ id: selectedDetailedOffer!.id, status: newStatus }));
  };


  if (!id) {
    return <NotFoundPage />;
  }

  if (isDataReceived && !selectedDetailedOffer) {
    navigate(AppRouter.NotFoundPage);
  }

  return !isDataReceived
    ? (<LoadingSpinner />)
    : (
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
                        to={`/offers/${id}`}
                      >
                        <span className="header__signout">Sign out</span>
                      </Link>}
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
                  <button
                    onClick={handleChangeFavoriteStatus}
                    className={selectedDetailedOffer?.isFavorite
                      ? 'offer__bookmark-button offer__bookmark-button--active button'
                      : 'offer__bookmark-button button'}
                    type="button"
                  >
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: `${(20 * selectedDetailedOffer!.rating)}%`}}></span>
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
                  <CommentList comments={comments} />
                  {authorizationStatus === AuthorizationStatus.Auth &&
                  <CommentForm
                    offerId={selectedDetailedOffer!.id}
                  />}
                </section>
              </div>
            </div>
            <section className="offer__map map">
              <Map
                cityLocation={selectedDetailedOffer!.city.location}
                points={nearbyOffers.slice(0, 3).map((nearbyOffer) => {
                  const offerPoint: Point = {
                    offerId: nearbyOffer.id,
                    longitude: nearbyOffer.location.longitude,
                    latitude: nearbyOffer.location.latitude
                  };

                  return offerPoint;
                })}
                currentSelectedPoint={{
                  offerId: selectedDetailedOffer!.id,
                  longitude: selectedDetailedOffer!.location.longitude,
                  latitude: selectedDetailedOffer!.location.latitude
                }}
              />
            </section>
          </section>
          <NearbyOfferList
            offers={nearbyOffers}
          />
        </main>
      </div>
    );
}

export default OfferPage;
