/** @format */

import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { updateLocalPage } from '../features/search/searchSlice'

function PageNav() {
  const dispatch = useDispatch()
  const { localPage } = useSelector((state) => state.search)

  return (
    <div className='mt-4 flex flex-row justify-center'>
      <div className='flex flex-row justify-between'>
        <button
          type='button'
          className='text-medium px-1  py-2'
        >
          {/* if beyond page 1, show left arrow */}
          {Number(localPage) > 1 ? (
            <FaChevronCircleLeft
              className='fa prev-btn'
              onClick={() => dispatch(updateLocalPage(Number(localPage) - 1))}
            />
          ) : null}
        </button>
        <button
          type='button'
          className='text-medium cursor-pointer px-1 py-2 text-center'
        >
          <FaChevronCircleRight
            className='text-lg'
            onClick={() => dispatch(updateLocalPage(Number(localPage) + 1))}
          />
        </button>
      </div>
    </div>
  )
}

export default PageNav
