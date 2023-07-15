/** @format */

import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import PageNav from '../components/PageNav'
import Spinner from '../components/Spinner'
import {
  createAlbum,
  getCollection,
  resetCollection,
} from '../features/collection/collectionSlice'

/// SearchResults: Application Page that displays search results ///
function SearchResults() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  // const { searchQuery } = useParams()

  const { query, searchResults, isLoading, isError, message } = useSelector(
    (state) => state.search,
  )

  useEffect(() => {
    if (isError) {
      console.error(message)
    }
    if (!user) navigate('/login')
    else dispatch(getCollection())

    // triggered when component unmounts
    return () => {
      // dispatch(resetSearch())
      dispatch(resetCollection()) // query - do I need to reset to empty collection?
    }
  }, [dispatch, navigate, user, isError, message])

  /// handleAdd: add album to user's collection
  const handleAdd = (album) => {
    console.log(`album title: ${JSON.stringify(album)}`)
    dispatch(createAlbum(album))
    toast.success('Album added to collection')
  }

  if (isLoading) {
    return <Spinner />
  }

  if (!searchResults) {
    return (
      <h1 className='prose prose-xl mb-8 mt-8 text-center'>No results found</h1>
    )
  }

  return (
    <section className='join-vertical join mt-12 flex flex-col items-center text-center'>
      <div className='prose prose-xl text-center'>
        <h1 className='join-item '>Search Results</h1>
        <h3 className='join-item'>{query}</h3>
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

/// SearchResultsItem: display album Item from search request ///
// @param - album: an album item from search request
// @param - onAdd: callback function to add album to user's collection
function SearchResultsItem({ album, onAdd }) {
  const { title, artist, genres, year, image, discogsId } = album

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
        <p className='text-primary-content'>{genres}</p>
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
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    year: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    discogsId: PropTypes.number.isRequired,
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
}

export default SearchResults
