import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'

function PageNav({ setPage }) {
  const { page } = useSelector((state) => state.search)

  return (
    <div className='pagination'>
      <button className='prev'>
        {/* if beyond page 1, show left arrow */}
        {Number(page) > 1 ? (
          <FaChevronCircleLeft className='fa prev-btn' onClick={() => setPage(page - 1)} />
        ) : null}
      </button>
      <button
        className='pageNum'
        onClick={() => setPage(Number(page))}
      >
        {page}
      </button>
      {/* show next 3 page numbers, clickable buttons */}
      <button
        className='pageNum'
        onClick={() => setPage(Number(page) + 1)}
      >
        {Number(page) + 1}
      </button>
      <button
        className='pageNum'
        onClick={() => setPage(Number(page) + 2)}
      >
        {Number(page) + 2}
      </button>
      {/* just select next page */}
      <button className='next'>
        <FaChevronCircleRight className='fa next-btn' onClick={() => setPage(Number(page) + 1)} />
      </button>
    </div>
  )
}

export default PageNav
