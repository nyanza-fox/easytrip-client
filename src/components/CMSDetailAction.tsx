'use client';

import { useRef } from 'react';

const CMSDetailAction = ({ children }: { children: React.ReactNode }) => {
  const detailModalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button className="btn btn-accent" onClick={() => detailModalRef.current?.showModal()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
        >
          <path d="M8 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
          <path
            fillRule="evenodd"
            d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5Zm5 5a3 3 0 1 0 1.524 5.585l1.196 1.195a.75.75 0 1 0 1.06-1.06l-1.195-1.196A3 3 0 0 0 9.5 7Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <dialog ref={detailModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => detailModalRef.current?.close()}
          >
            ✕
          </button>
          {children}
        </div>
      </dialog>
    </>
  );
};

export default CMSDetailAction;
