import {Offer} from '../../../interfaces/offer.ts';
import OfferCard from './offer-card.tsx';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {DetailedOffer} from '../../../interfaces/detailed-offer.ts';

function OffersList(props: { detailedOffers: DetailedOffer[] }) {
  const [, setIsActiveCardId] = useState<string | null>(null);

  const handleMouseOver = (value: string) => {
    setIsActiveCardId(value);
  };

  const handleMouseOut = () => {
    setIsActiveCardId(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      { props.detailedOffers.map((review) => (
        <Link key={review.id} to={ `/offer/${review.id}` }>
          <OfferCard
            key={review.id}
            offer={review as Offer}
            handleMouseOver={handleMouseOver}
            handleMouseOut={handleMouseOut}
          />
        </Link>
      ))}
    </div>
  );
}

export default OffersList;
