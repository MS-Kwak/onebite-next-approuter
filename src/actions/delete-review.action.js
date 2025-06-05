'use server';

import apiBaseUrl from '@/util/api';
import { revalidateTag } from 'next/cache';

// src/components/review-item-delete-button.jsx 의 useActionState 훅의 state값이 첫번째 인자로 전달됩니다.
export async function deleteReviewAction(_, formData) {
  const reviewId = formData.get('reviewId')?.toString();
  const bookId = formData.get('bookId')?.toString();

  console.log('리뷰 삭제 요청:', {
    reviewId,
    bookId,
  });

  if (!reviewId || !bookId) {
    return { status: false, error: '리뷰 ID와 책 ID는 필수 입력 사항입니다.' };
  }

  try {
    const response = await fetch(`${apiBaseUrl}/review/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookId }),
    });

    console.log('리뷰 삭제 응답:', response);

    if (!response.ok) {
      throw new Error(`리뷰 삭제 실패: ${response.status} ${response.statusText}`);
    }

    // 리뷰 삭제 후, 해당 책의 리뷰 목록을 새로고침합니다.
    revalidateTag(`review-${bookId}`);

    return { status: true, error: '' };
  } catch (error) {
    console.error('리뷰 삭제 중 오류 발생:', error);
    return { status: false, error: error.message };
  }
}
