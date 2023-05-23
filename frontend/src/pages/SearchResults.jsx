/** @format */

import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { searchAlbums, reset } from '../features/search/searchSlice'
import Spinner from '../components/Spinner'
import AlbumItem from '../components/AlbumItem'
import PageNav from '../components/PageNav'

function SearchResults() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { query } = useParams()

  const { user } = useSelector((state) => state.auth)
  const { searchResults, page, isLoading, isError, message } =
    useSelector((state) => state.search)

  const [currentPage, setCurrentPage] = useState(page)

  useEffect(() => {
    if (isError) {
      console.error(message)
    }

    // if user is not logged in, redirect to login page
    if (!user) {
      navigate('/login')
    } else {
      dispatch(searchAlbums({ query, currentPage }))
    }

    // triggered when component unmounts
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch, query, currentPage])

  const setPage = (newPage) => {
    setCurrentPage(newPage)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className=''>
        <h1 className='text-xl font-bold my-6 px-2'>
          Search Results
        </h1>
        <p className='text-md mb-6 font-medium text-secondary'>
          {query}
        </p>
      </section>
      <section className='flex flex-col md:flex-row items-center justify-center'>
        {searchResults.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {searchResults.map((album) => (
              <AlbumItem
                key={album.discogsId}
                album={album}
                buttonValue={'add'}
              />
            ))}
          </div>
        ) : (
          <h3 className='text-lg font-medium text-secondary my-6'>
            No results found
          </h3>
        )}
      </section>
      <PageNav setPage={setPage} />
    </>
  )
}

export default SearchResults
