/** @format */

import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DashAlbumItem from '../components/DashAlbumItem'
import Spinner from '../components/Spinner'
import {
  getCollection,
  resetCollectionBools,
} from '../features/collection/collectionSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { collection, isLoading, isError, message } = useSelector(
    (state) => state.collection,
  )

  const { album: stateAlbum } = useSelector((state) => state.album)

  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCollection, setFilteredCollection] = useState([])

  useEffect(() => {
    if (isError) {
      console.error(message)
    }

    // if user is not logged in, redirect to login page
    if (!user) {
      navigate('/login')
    } else {
      dispatch(getCollection())
    }

    // triggered when component unmounts
    return () => {
      dispatch(resetCollectionBools())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, stateAlbum])

  useEffect(() => {
    setFilteredCollection(
      collection.filter(
        (album) =>
          album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          album.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          album.genres.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    )
  }, [searchQuery, collection])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='prose dark:prose-invert md:prose-lg lg:prose-xl my-4 mb-12 mt-12 text-center'>
        <h1 className=''>Welcome {user && user.name}</h1>
        <h3 className=''>Your Collection</h3>
      </div>

      <form>
        <div className='join'>
          <input
            type='search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search Collection'
            className='input-bordered input-primary input join-item'
          />
          <button
            type='button'
            className='btn btn-secondary join-item'
          >
            <FaSearch />
          </button>
        </div>
      </form>

      <section className=''>
        {filteredCollection.length > 0 ? (
          <div className='grid grid-cols-1 px-4 md:grid-cols-2 lg:grid-cols-3'>
            {filteredCollection.map((album) => (
              <DashAlbumItem
                key={album._id}
                album={album}
              />
            ))}
          </div>
        ) : (
          <h3>Your collection is empty</h3>
        )}
      </section>
    </div>
  )
}

export default Dashboard
