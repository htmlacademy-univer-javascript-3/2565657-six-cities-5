import {Offer} from '../../interfaces/offer.ts';
import OfferCard from './offer-card.tsx';
import {Link} from 'react-router-dom';
import {Point} from '../../interfaces/point.ts';

type OffersListProps = {
  isNearbyOffersList: boolean;
  offers: Offer[];
  setSelectedPoint: React.Dispatch<React.SetStateAction<Point | null>>;
}

function OffersList({ isNearbyOffersList, offers, setSelectedPoint } : OffersListProps) {

  const handleMouseOver = (id: string) => {
    const point = offers.find((offer) => offer.id === id)!.point;
    setSelectedPoint(point);
  };

  const handleMouseOut = () => {
    setSelectedPoint(null);
  };

  return isNearbyOffersList ? (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {offers.length === 0
            ? <p>There are no nearby places</p>
            : offers.map((nearbyOffer) => (
              <Link onClick={() => window.scrollTo(0, 0)} key={nearbyOffer.id} to={`/offer/${nearbyOffer.id}`}>
                <OfferCard
                  key={nearbyOffer.id}
                  isNearbyOfferCard={isNearbyOffersList}
                  offer={nearbyOffer}
                  handleMouseOver={handleMouseOver}
                  handleMouseOut={handleMouseOut}
                />
              </Link>
            ))}
        </div>
      </section>
    </div>
  ) : (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <Link key={offer.id} to={`/offer/${offer.id}`}>
          <OfferCard
            key={offer.id}
            offer={offer}
            isNearbyOfferCard={isNearbyOffersList}
            handleMouseOver={() => handleMouseOver(offer.id)}
            handleMouseOut={handleMouseOut}
          />
        </Link>
      ))}
    </div>
  );
}

export default OffersList;
