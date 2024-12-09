import {Comment} from '../../../../interfaces/comment.ts';
import CommentCard from './comment-card.tsx';

type ReviewsListProps = {
  comments: Comment[];
}

function CommentsList({ comments } : ReviewsListProps) {
  return (
    <ul className="reviews__list">
      {comments.map((review) => (<CommentCard key={review.id} review={review}/>))}
    </ul>
  );
}

export default CommentsList;
