import {Comment} from '../../../../interfaces/comment.ts';
import ReviewCard from './review-card.tsx';

type ReviewsListProps = {
  comments: Comment[];
}

function ReviewsList({ comments } : ReviewsListProps) {
  return (
    <ul className="reviews__list">
      {comments.map((review) => (<ReviewCard key={review.id} review={review}/>))}
    </ul>
  );
}

export default ReviewsList;
