'use client';

import { createPortal } from 'react-dom';
import style from './modal.module.css';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Modal({ children }) {
  const dialogRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, []);

  return createPortal(
    <dialog
      // Esc 키를 누르면 대화 상자를 닫습니다.
      onClose={() => {
        router.back();
      }}
      onClick={(e) => {
        if (e.target.nodeName === 'DIALOG') {
          // 대화 상자 외부를 클릭하면 대화 상자를 닫습니다.
          router.back();
        }
      }}
      className={style.modal}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById('modal-root')
  );
}
