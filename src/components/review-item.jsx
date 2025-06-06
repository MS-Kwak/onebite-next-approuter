import ReviewItemDeleteButton from './review-item-delete-button';
import style from './review-item.module.css';

export default function ReviewItem({ id, content, author, createdAt, bookId }) {
  return (
    <div className={style.container}>
      <div className={style.author}>{author}</div>
      <div className={style.content}>{content}</div>
      <div className={style.bottom_container}>
        <div className={style.date}>{new Date(createdAt).toLocaleString()}</div>
        <ReviewItemDeleteButton reviewId={id} bookId={bookId} />
      </div>
    </div>
  );
}
