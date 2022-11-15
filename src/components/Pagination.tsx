import { CaretLeft, CaretRight } from 'phosphor-react'

interface PaginationProps {
  pages: number
  page: number
  setPage: (page: number) => void
}

export function Pagination({ page, pages, setPage }: PaginationProps) {
  return (
    <div className='flex gap-2 items-center justify-center mt-10'>
      {page <= 1 ? (
        <button className='text-gray-500 mr-2' disabled>
          <CaretLeft weight='bold' size={24} />
        </button>
      ) : (
        <button className='text-green-600 mr-2' onClick={() => setPage(page - 1)}>
          <CaretLeft weight='bold' size={24} />
        </button>
      )}
      {Array.from({ length: pages }, (_, i) => (
        page === i + 1 ? (
          <button key={i} className='w-10 h-10 flex items-center justify-center rounded-md bg-green-600 text-gray-100' disabled>
            {i + 1}
          </button>
        ) : (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className='w-10 h-10 flex items-center justify-center rounded-md bg-gray-500 text-gray-300'>
            {i + 1}
          </button>
          )
      ))}
      {page >= pages ? (
        <button className='text-gray-500 ml-2' disabled>
          <CaretRight weight='bold' size={24} />
        </button>
      ) : (
        <button className='text-green-600 ml-2' onClick={() => setPage(page + 1)}>
          <CaretRight weight='bold' size={24} />
        </button>
      )}
    </div>
  )
}