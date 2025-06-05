'use client';

import { useActionState, useEffect, useRef } from 'react';
import { deleteReviewAction } from '@/actions/delete-review.action';

export default function ReviewItemDeleteButton({ reviewId, bookId }) {
  const formRef = useRef(null);

  const [state, formAction, isPending] = useActionState(deleteReviewAction, null);

  // 에러 핸들링
  useEffect(() => {
    if (state && !state.status) {
      console.error('리뷰 삭제 실패:', state.error);
      alert(`리뷰 삭제 실패: ${state.error}`);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" value={reviewId} hidden readOnly />
      <input name="bookId" value={bookId} hidden readOnly />
      {/* submit보다 reauestSubmit이 더 안전하기 때문에 권장함! */}
      {isPending ? (
        <div>삭제 중...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
      )}
    </form>
  );
}
