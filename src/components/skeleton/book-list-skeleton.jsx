import BookItemSkeleton from './book-item-skeleton';

export default function BookListSkeleton({ count }) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => <BookItemSkeleton key={`bopk-item-skeletion-${idx}`} />);
}
