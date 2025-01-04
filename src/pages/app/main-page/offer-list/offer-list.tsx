import {Offer} from '../../../../components/interfaces/offer.ts';
import OfferCard from './offer-card.tsx';

type OffersListProps = {
  offers: Offer[];
  setSelectedPoint: React.Dispatch<React.SetStateAction<string | null>>;
}

function OfferList({ offers, setSelectedPoint } : OffersListProps) {

  const handleMouseOver = (id: string) => {
    setSelectedPoint(id);
  };

  const handleMouseOut = () => {
    setSelectedPoint(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          handleMouseOver={() => handleMouseOver(offer.id)}
          handleMouseOut={handleMouseOut}
        />
      ))}
    </div>
  );
}

export default OfferList;
