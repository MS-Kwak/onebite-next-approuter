import BookPage from '@/app/book/[id]/page';
import Modal from '@/components/modal';

export default function Page(props) {
  return (
    <Modal>
      <BookPage {...props} />
    </Modal>
  );
}
