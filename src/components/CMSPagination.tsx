import Link from 'next/link';

const CMSPagination = ({
  pathname,
  currentPage,
  totalPage,
}: {
  pathname: string;
  currentPage: number;
  totalPage: number;
}) => {
  return (
    <div className="join">
      {[...Array(totalPage)].map((_, idx) => (
        <Link
          key={idx}
          href={`${pathname}?page=${idx + 1}`}
          className={`join-item btn ${currentPage === idx + 1 ? 'btn-active' : ''}`}
        >
          {idx + 1}
        </Link>
      ))}
    </div>
  );
};

export default CMSPagination;
