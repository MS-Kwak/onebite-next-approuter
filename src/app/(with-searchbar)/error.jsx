'use client';

import { useRouter } from 'next/navigation';
import { useEffect, startTransition } from 'react';

// error props는 자동으로 리액트 컴포넌트에서 전달됨.
// reset props는 에러 상태를 초기화하고, 컴포넌트를 다시 렌더링하는 역할을 합니다.
export default function Error({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error('에러 발생:', error);
    console.error('에러 발생:', error.message);

    // 에러를 로깅하거나 사용자에게 알리는 등의 추가 작업을 수행할 수 있습니다.
  }, [error]);

  return (
    <div>
      <h2>오류가 발생했습니다!</h2>
      <p>죄송합니다. 페이지를 불러오는 중에 문제가 발생했습니다.</p>
      <button
        onClick={() => {
          startTransition(() => {
            // startTransition은 React의 상태 업데이트를 비동기적으로 처리하여 UI의 응답성을 향상시킵니다.
            // 이 함수는 상태 업데이트가 완료될 때까지 기다리지 않고, 다른 작업을 계속할 수 있도록 합니다.
            router.refresh(); // 서버측에 새로운 요청을 보내고 페이지를 새로 고칩니다. 현재 페이지에 필요한 서버 컴포넌트들을 다시 불러옴.
            reset(); // reset()은 에러 상태를 초기화하고, 컴포넌트들을 다시 렌더링. 서버측에서 실행하는 컴포넌트를 다시 실행하지 않는다!! 클라이언트측(브라우저)만 reset()을 실행한다.
          });
        }}
      >
        다시 시도하기
      </button>
    </div>
  );
}
