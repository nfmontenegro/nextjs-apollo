import Link from 'next/link'

import ContentPagination from './styles/ContentPagination'

function Pagination({page, pages, count, path}) {
  return (
    <ContentPagination>
      <Link
        prefetch
        href={{
          pathname: path,
          query: {page: page - 1}
        }}
      >
        <a className="prev" aria-disabled={page <= 1}>
          ← Prev
        </a>
      </Link>
      <p>
        Page {page} of
        <span className="totalPages"> {pages}</span>
      </p>
      <p>{count} Items Total</p>{' '}
      <Link
        prefetch
        href={{
          pathname: path,
          query: {page: parseInt(page) + 1}
        }}
      >
        <a className="next" aria-disabled={page >= pages}>
          Next →
        </a>
      </Link>
    </ContentPagination>
  )
}

export default Pagination
