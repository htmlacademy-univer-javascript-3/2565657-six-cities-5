import NearbyOfferCard from './nearby-offer-card.tsx';
import {Offer} from '../../../../components/interfaces/offer.ts';

type OffersListProps = {
  offers: Offer[];
}

function NearbyOfferList({ offers } : OffersListProps) {
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {!offers.length
            ? <p>There are no nearby places</p>
            : offers.slice(0, 3).map((nearbyOffer) => (
              <NearbyOfferCard
                key={nearbyOffer.id}
                offer={nearbyOffer}
              />
            ))}
        </div>
      </section>
    </div>
  );
}

export default NearbyOfferList;
