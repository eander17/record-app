/** @format */

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  getCollection,
  reset,
} from '../features/collection/collectionSlice.js'
import AlbumItem from '../components/AlbumItem'
import Spinner from '../components/Spinner'
import SearchBar from '../components/SearchBar'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { collection, isLoading, isError, message } = useSelector(
    (state) => state.collection
  )

  const [searchQuery, setSearchQuery] = useState('')

    

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
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  const handleSearch = (query) => {
    return collection.filter((album) => {
      return (
        album.title.toLowerCase().includes(query.toLowerCase()) ||
        album.artist.toLowerCase().includes(query.toLowerCase()) ||
        album.genre.toLowerCase().includes(query.toLowerCase())
      )
    })
  }
 
  

  const filteredCollection = handleSearch(searchQuery) // use state for this? 

  
  
  if (isLoading) {
    return <Spinner />
  }

  

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='prose lg:prose-xl md:prose-lg dark:prose-invert text-center my-4 mt-12 mb-12'>
        <h1 className=''>Welcome {user && user.name}</h1>
        <h3 className=''>Your Collection</h3>
      </div>


      <SearchBar
        placeholder={'Search Collection'}
        onSubmit={handleSearch}
        onChange={(query) => setSearchQuery(query)}
      />

      <section className=''>
        {filteredCollection.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4'>
            {filteredCollection.map((album) => (
              <AlbumItem
                key={album._id}
                album={album}
                page={'onDash'}
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