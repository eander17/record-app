import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaPlus, FaEdit, FaTimes } from 'react-icons/fa'
import { getAlbumById, reset } from '../features/collection/collectionSlice'
import Spinner from '../components/Spinner'
import CustomFieldForm from '../components/CustomFieldForm'
import AlbumItem from '../components/AlbumItem'
import AlbumEdit from '../components/AlbumEdit'

function AlbumDetails() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { id } = useParams()
  const { user } = useSelector((state) => state.auth)
  const { album, isLoading, isError, message } = useSelector(
    (state) => state.collection
  )

  const [showCustomFields, setShowCustomFields] = useState(false)
  const [showEditFields, setShowEditFields] = useState(false)

  const handleAddCustomField = (e) => {
    e.preventDefault()
    setShowCustomFields(!showCustomFields)
  }

  const handleEditAlbum = (e) => {
    e.preventDefault()
    setShowEditFields(!showEditFields)
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    // if user is not logged in, redirect to login page
    if (!user) {
      navigate('/login')
    } else {
      dispatch(getAlbumById(id))
    }
    // triggered when component unmounts
    return () => {
      dispatch(reset())
    }
  }, [dispatch, id, navigate, user, isError, message])

  if (!album) {
    return <h1>Album not found</h1>
  }
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Details: {album && album.title} </h1>
        <p>Change, Edit, or add new fields</p>
      </section>
      <section className='content'>
        <AlbumItem
          album={album}
          buttonValue={'edit'}
        />
        <section className='btn-group'>
          <button
            className='btn'
            onClick={handleAddCustomField}
          >
            {showCustomFields ? (
              <>
                <FaTimes className='fa del-btn' /> Cancel
              </>
            ) : (
              <>
                <FaPlus className='fa plus-btn' /> Add Custom Field
              </>
            )}
          </button>
          <button
            className='btn'
            onClick={handleEditAlbum}
          >
            {showEditFields ? (
              <>
                {' '}
                <FaTimes className='fa del-btn' /> Cancel
              </>
            ) : (
              <>
                {' '}
                <FaEdit className='fa edit-btn' /> Edit Fields
              </>
            )}
          </button>
        </section>

            
        <section className='custom-fields'>
          {showCustomFields && <CustomFieldForm album={album} />}
        </section>

        <section className="edit-fields">
          {showEditFields && <AlbumEdit album={album} />}
        </section>
      </section>
    </>
  )
}

export default AlbumDetails
