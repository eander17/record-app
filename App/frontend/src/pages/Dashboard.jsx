import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import AlbumForm from '../components/AlbumForm'
import { getCollection, reset } from '../features/collection/collectionSlice.js'
import AlbumItem from '../components/AlbumItem'
import Spinner from '../components/Spinner'
import SearchBar from '../components/SearchBar'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { collection, isLoading, isError, message } = useSelector(
    (state) => state.collection
  )

  const [editAlbum, setEditAlbum] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // // takes album from AlbumItem and passes it to AlbumForm
  const handleEdit = (album) => {
    navigate(`/edit/${album._id}`)
  }

  const handleResetUpdate = (value) => {
    setEditAlbum(null)
    value && dispatch(getCollection())
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
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

  const filteredCollection = handleSearch(searchQuery)

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Your Collection</p>
      </section>

      {/* <AlbumForm
        albumData={editAlbum}
        onUpdate={handleResetUpdate}
      /> */}

      <SearchBar
        placeholder={'Search Collection'}
        onSubmit={handleSearch}
        onChange={(query) => setSearchQuery(query)}
      />

      <section className='content'>
        {filteredCollection.length > 0 ? (
          <div className='collection'>
            {filteredCollection.map((album) => (
              <AlbumItem
                key={album._id}
                album={album}
                handleEdit={handleEdit}
                owned={true}
              />
            ))}
          </div>
        ) : (
          <h3>Your collection is empty</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
