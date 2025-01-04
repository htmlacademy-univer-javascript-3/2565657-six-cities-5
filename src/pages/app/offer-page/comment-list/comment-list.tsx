import CommentCard from './comment-card.tsx';
import {Comment} from '../../../../components/interfaces/comment.ts';

type ReviewsListProps = {
  comments: Comment[];
}

function CommentList({ comments } : ReviewsListProps) {
  return (
    <ul className="reviews__list">
      {comments
        .slice()
        .sort((firstComment, secondComment) =>
          new Date(secondComment.date).getTime() - new Date(firstComment.date).getTime())
        .slice(0, 10)
        .map((comment) => (<CommentCard key={comment.id} comment={comment}/>))}
    </ul>
  );
}

export default CommentList;
