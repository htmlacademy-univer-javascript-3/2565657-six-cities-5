import {useRef, useState} from 'react';
import {useAppDispatch} from '../../../components/store';
import {fetchAddCommentAction} from '../../../components/store/actions/api-actions.ts';

interface CommentData {
  comment: string;
  rating: string;
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>

type CommentFormProps = {
  offerId: string;
}

function CommentForm({ offerId } : CommentFormProps) {
  const [formData, setFormData] = useState<CommentData>({
    comment: '',
    rating: ''
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const formRef = useRef<HTMLFormElement | null>(null);

  const dispatch = useAppDispatch();

  const handleFormChange = (e: ChangeEvent) => {
    const name = e.target.name;

    const newFormData: CommentData = {
      ...formData,
      [name]: e.target.value
    };

    setFormData(newFormData);

    if (newFormData.comment.length >= 50 && newFormData.rating) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const box = { id: offerId, comment: formData.comment, rating: Number(formData.rating) };

    dispatch(fetchAddCommentAction(box));
    formRef.current?.reset();
    setFormData({
      comment: '',
      rating: ''
    });
  };

  return (
    <form ref={formRef} onSubmit={handleFormSubmit} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="comment">Your comment</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" onChange={handleFormChange} name="rating" value="5" id="5-stars" type="radio" />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={handleFormChange} name="rating" value="4" id="4-stars" type="radio" />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={handleFormChange} name="rating" value="3" id="3-stars" type="radio" />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={handleFormChange} name="rating" value="2" id="2-stars" type="radio" />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={handleFormChange} name="rating" value="1" id="1-star" type="radio" />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        value={formData.comment}
        onChange={handleFormChange}
        maxLength={300}
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit comment please make sure to set
          <span className="reviews__star">
            rating
          </span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabled}>Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
