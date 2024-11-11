import {Offer} from '../../../interfaces/offer.ts';
import OfferCard from './offer-card.tsx';
import {Link} from 'react-router-dom';
import {Point} from '../../../interfaces/point.ts';

type OffersListProps = {
  offers: Offer[];
  setSelectedPoint: React.Dispatch<React.SetStateAction<Point | null>>;
}

function OffersList({ offers, setSelectedPoint } : OffersListProps) {


  const handleMouseOver = (id: string) => {
    const point = offers.find((offer) => offer.id === id)!.point;
    setSelectedPoint(point);
  };

  const handleMouseOut = () => {
    setSelectedPoint(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      { offers.map((offer) => (
        <Link key={offer.id} to={ `/offer/${offer.id}` }>
          <OfferCard
            key={offer.id}
            offer={offer}
            handleMouseOver={() => handleMouseOver(offer.id)}
            handleMouseOut={handleMouseOut}
          />
        </Link>
      ))}
    </div>
  );
}

export default OffersList;
