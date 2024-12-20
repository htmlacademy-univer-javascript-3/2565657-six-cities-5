import {Comment} from '../../../../interfaces/comment.ts';

type ReviewCardProps = {
  review: Comment;
}

function CommentCard({ review } : ReviewCardProps) {
  const [year, month, day] = review.date.split('-');
  const formattedDate = `${day}.${month}.${year}`;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54"
            alt="Reviews avatar"
          >
          </img>
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${20 * review.rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={review.date}>{formattedDate}</time>
      </div>
    </li>
  );
}

export default CommentCard;
