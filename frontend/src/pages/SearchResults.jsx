/** @format */

import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { searchAlbums, reset } from '../features/search/searchSlice'
import Spinner from '../components/Spinner'
import AlbumItem from '../components/AlbumItem'
import PageNav from '../components/PageNav'

function SearchResults() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const {
    searchResults,
    query,
    requestPage,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.search)

  useEffect(() => {
    // if user is not logged in, redirect to login page
    if (!user) {
      navigate('/login')
    } else {
      dispatch(searchAlbums({ query, requestPage }))
    }
  }, [])

  useEffect(() => {
    if (isError) {
      console.error(message)
    }

    if (!user) navigate('/login')

    // triggered when component unmounts
    return () => {
      dispatch(reset())
    }
  }, [dispatch, navigate, user, isError, message])

  if (isLoading) {
    return <Spinner />
  }

  if (searchResults) {
    return (
      <>
        <section className='join-vertical join mt-12 flex flex-col items-center text-center'>
          <div className='prose prose-xl text-center'>
            <h1 className='join-item '>Search Results</h1>
            <h3 className='join-item'>{query}</h3>
          </div>
          <section className='join-item'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {searchResults.map((album) => (
                <AlbumItem
                  key={album.discogsId}
                  album={album}
                  page={'onSearch'}
                />
              ))}
            </div>
          </section>
          <div className='join-item justify-end'>
            <PageNav />
          </div>
        </section>
      </>
    )
  } else {
    return (
      <h1 className='prose prose-xl mb-8 mt-8 text-center'>
        No results found
      </h1>
    )
  }
}

export default SearchResults
