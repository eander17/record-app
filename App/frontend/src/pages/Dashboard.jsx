import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import AlbumForm from '../components/AlbumForm'
import { getCollection, reset } from '../features/collection/collectionSlice.js'
import AlbumItem from '../components/AlbumItem'
import Spinner from '../components/Spinner'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { collection, isLoading, isError, message } = useSelector(
    (state) => state.collection
  )


  


  const [editAlbum, setEditAlbum] = useState(null)

  // takes album from AlbumItem and passes it to AlbumForm
  const handleEdit = (album) => setEditAlbum(album)

  const handleResetUpdate = (value) =>{
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

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Your Collection</p>
      </section>

      <AlbumForm
        albumData={editAlbum}
        onUpdate={handleResetUpdate}
      />

      <section className='content'>
        {collection.length > 0 ? (
          <div className='collection'>
            {collection.map((album) => (
              <AlbumItem
                key={album._id}
                album={album}
                handleEdit={handleEdit}
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
