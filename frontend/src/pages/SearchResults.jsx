/** @format */

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { reset } from '../features/search/searchSlice'
import {
  getCollection,
  createAlbum,
  resetCollection,
} from '../features/collection/collectionSlice'
import Spinner from '../components/Spinner'
import PageNav from '../components/PageNav'

/// SearchResults: Application Page that displays search results ///
function SearchResults() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { searchQuery } = useParams()

  const { searchResults, isLoading, isError, message } = useSelector(
    (state) => state.search,
  )

  // TEST - does this run ONLY once on component mount?
  useEffect(() => {
    // if user is not logged in, redirect to login page
    if (!user) {
      navigate('/login')
    } else {
      dispatch(getCollection())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isError) {
      console.error(message)
    }
    if (!user) navigate('/login')

    // triggered when component unmounts
    return () => {
      dispatch(reset())
      dispatch(resetCollection()) // query - do I need to reset to empty collection?
    }
  }, [dispatch, navigate, user, isError, message])

  /// handleAdd: add album to user's collection
  const handleAdd = (album) => {
    dispatch(createAlbum(album))
    toast.success('Album added to collection')
  }

  if (isLoading) {
    return <Spinner />
  }

  if (searchResults.length > 0) {
    return (
      <section className='join-vertical join mt-12 flex flex-col items-center text-center'>
        <div className='prose prose-xl text-center'>
          <h1 className='join-item '>Search Results</h1>
          <h3 className='join-item'>{searchQuery}</h3>
        </div>
        <section className='join-item'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {searchResults.map((album) => (
              <SearchResultsItem
                key={album.discogsId}
                album={album}
                onAdd={handleAdd}
              />
            ))}
          </div>
        </section>
        <div className='join-item justify-end'>
          <PageNav />
        </div>
      </section>
    )
  }

  return (
    <h1 className='prose prose-xl mb-8 mt-8 text-center'>No results found</h1>
  )
}

/// SearchResultsItem: display album Item from search request ///
// @param - album: an album item from search request
// @param - onAdd: callback function to add album to user's collection
function SearchResultsItem({ album, onAdd }) {
  const { title, artist, genre, year, image, discogsId } = album

  const { collection } = useSelector((state) => state.collection)

  const [owned, setOwned] = useState(false)

  useEffect(() => {
    if (collection) {
      setOwned(
        collection.some((ownedAlbum) => ownedAlbum.discogsId === discogsId),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection])

  return (
    <div className='card bg-primary mx-4 my-12 shadow-xl md:mx-8'>
      <figure className=''>
        <img
          src={image}
          alt={title}
          className='h-full w-full'
        />
      </figure>
      {/* // todo - make a table? */}
      <div className='card-body justify-between text-justify '>
        <h2 className='card-title text-primary-content'>{title}</h2>
        <p className='text-primary-content'>{artist}</p>
        <p className='text-primary-content'>{genre}</p>
        <p className='text-primary-content'>{year}</p>
        <div className='card-actions justify-end'>
          {owned ? (
            <div className='badge badge-secondary badge-lg text-secondary-content gap-2'>
              In Collection
            </div>
          ) : (
            <button
              type='button'
              onClick={() => onAdd(album)}
              className='btn btn-square btn-success'
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

SearchResultsItem.propTypes = {
  album: PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    discogsId: PropTypes.number.isRequired,
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
}

export default SearchResults
