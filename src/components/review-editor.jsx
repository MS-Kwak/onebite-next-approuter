'use client';

import { useActionState, useEffect } from 'react';
import style from './review-editor.module.css';
import { createReviewAction } from '@/actions/create-review.action';

export default function ReviewEditor({ bookId }) {
  // 작성하기 버튼 클릭 시, useActionState 훅을 사용하여 서버 액션을 호출합니다.
  // useActionState는 서버 액션의 상태를 관리하는 훅으로, 서버 액션의 결과를 클라이언트에서 사용할 수 있게 해줍니다.
  // 이 훅은 서버 액션을 호출하고, 그 결과를 상태로 관리합니다.
  // 이 훅은 서버 액션의 상태(state), 액션 함수(formAction), 로딩 상태(isPending)를 반환합니다.
  // useActionState(폼 액션, 폼 상태 초기값);
  const [state, formAction, isPending] = useActionState(createReviewAction, null);

  useEffect(() => {
    // 서버 액션의 상태가 변경될 때마다 실행되는 useEffect 훅입니다.
    // 서버 액션이 성공적으로 완료되면, 상태(state)가 업데이트됩니다.
    // 이 상태를 사용하여 사용자에게 성공 메시지를 표시하거나, 다른 작업을 수행할 수 있습니다.
    if (state && !state.status) {
      alert(state.error || '리뷰 작성에 실패했습니다.');
    }
  }, [state]);

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea disabled={isPending} required name="content" placeholder="리뷰 내용" />
        <div className={style.submit_container}>
          <input disabled={isPending} required name="author" placeholder="작성자" />
          <button disabled={isPending} type="submit">
            {isPending ? '...' : '작성하기'}
          </button>
        </div>
      </form>
    </section>
  );
}
