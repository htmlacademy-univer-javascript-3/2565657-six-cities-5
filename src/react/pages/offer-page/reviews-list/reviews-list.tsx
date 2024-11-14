import {Review} from '../../../../interfaces/review.ts';
import ReviewCard from './review-card.tsx';

type ReviewsListProps = {
  reviews: Review[];
}

function ReviewsList({ reviews } : ReviewsListProps) {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (<ReviewCard key={review.id} review={review}/>))}
    </ul>
  );
}

export default ReviewsList;
