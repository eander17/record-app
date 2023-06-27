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
      <section className='join join-vertical flex flex-col text-center items-center mt-12'>
        <div className='prose prose-xl text-center'>
          <h1 className='join-item '>Search Results</h1>
          <h3 className='join-item'>{query}</h3>
        </div>
        <section className='join-item'>
          {searchResults.length > 0 ? (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {searchResults.map((album) => (
                  <AlbumItem
                    key={album.discogsId}
                    album={album}
                    page={'onSearch'}
                  />
                ))}
              </div>
              <PageNav setPage={setPage} />
            </>
          ) : (
            <h3 className='prose prose-xl text-center mt-8 mb-8'>
              No results found
            </h3>
          )}
        </section>
      </section>
    </>
  )
}

export default SearchResults
