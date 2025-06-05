'use server';

import apiBaseUrl from '@/util/api';
// import delay from '@/util/delay';
import { revalidateTag } from 'next/cache';

// src/components/review-editor.jsx 의 useActionState 훅의 state값이 첫번째 인자로 전달됩니다.
export async function createReviewAction(state, formData) {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  console.log('리뷰 작성 요청:', {
    bookId,
    content,
    author,
  });

  if (!bookId || !content || !author) {
    return { status: false, error: '리뷰 내용, 작성자는 필수 입력 사항입니다.' };
  }

  try {
    // await delay(2000); // 서버 액션의 실행을 1초 지연시킵니다. (예시로 사용)
    const response = await fetch(`${apiBaseUrl}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookId,
        content,
        author,
      }),
    });

    console.log('리뷰 작성 응답:', response);
    // 패스를 재검증하여 리뷰 목록을 새로고침합니다.
    // revalidatePath는 Next.js의 캐시 무효화 함수로, 특정 경로의 데이터를 새로고침합니다.
    // 이 경우, 리뷰가 작성된 책의 상세 페이지를 새로고침합니다.
    // -> 클라이언트 컴포넌트에서는 호출할 수 없으므로 서버 액션에서 사용합니다.
    // -> 데이터 캐시는 무효화, 즉 삭제된다. {cache: 'force-cache'} 무효화 된다!!

    // 1. 특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);

    // 2. 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath('/book/[id]', 'page);

    // 3. 특정 레이아웃을 갖는 모든 페이지를 재검증
    // revalidatePath('/(with-searchbar)', 'layout');

    // 4. 모든 데이터를 재검증
    // revalidatePath('/', 'layout');

    if (!response.ok) {
      throw new Error(`리뷰 작성 실패: ${response.status} ${response.statusText}`);
    }

    // 5. 태그 기준, 데이터 캐시 재검증. 첫벗째 방법보다 훨씬 경제적이고 효율적임!
    // /src/app/book/[id]/page.jsx
    revalidateTag(`review-${bookId}`);

    return { status: true, message: '리뷰가 성공적으로 저장되었습니다.' };
  } catch (error) {
    console.error('리뷰 저장에 실패했습니다:', error);
    return { status: false, error: `리뷰 저장에 실패했습니다: ${error}` };
  }
}
