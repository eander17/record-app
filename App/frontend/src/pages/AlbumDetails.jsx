import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaPlus, FaEdit, FaTimes } from 'react-icons/fa'
import {
  getAlbumById,
  reset,
} from '../features/collection/collectionSlice'
import CustomFieldForm from '../components/CustomFieldForm'
import AlbumItem from '../components/AlbumItem'
import AlbumEdit from '../components/AlbumEdit'

function AlbumDetails() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { id } = useParams()  //! need to do because store doesn't have album yet. 
  const { user } = useSelector((state) => state.auth)
  const { album, isError, message } = useSelector(
    (state) => state.collection
  )

  const { hasValue } = useSelector((state) => state.custFields)

  // ? useRef to store hasValue in a mutable variable that doesn't cause component to re-render
  const hasValueRef = useRef(hasValue)
  useEffect(() => {
    hasValueRef.current = hasValue
  }, [hasValue])

  console.log('hasValueRef.current:', hasValueRef.current)

  // ? BOOL: state variables to control form visibility
  const [showCustomFields, setShowCustomFields] = useState(false)
  const [showEditFields, setShowEditFields] = useState(false)

  /// handleAddCustomField: toggles the add custom field form
  const handleAddCustomField = () => {
    setShowCustomFields(!showCustomFields)
  }

  /// handleEditAlbum: toggles the edit form
  const handleEditAlbum = () => {
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

    // ? if hasValue is true, show the custom field form
    hasValueRef.current && setShowCustomFields(true)

    // dispatches reset for collectionSlice
    return () => {
      dispatch(reset())
    }
  }, [dispatch, id, navigate, user, isError, message])

  // ? if album is null, returns album not found.
  if (!album) {
    return <h1>Album not found</h1>
  }
  /// return section
  // TODO: make return section more readable
  return (
    <>
      {/* // ? displays page title and purpose.
       */}
      <section className='heading'>
        <h1>Details: {album && album.title} </h1>
        <p>Change, Edit, or add new fields</p>
      </section>
      {/*     //? End of heading section
        *    //? Start of content section - contains album item and forms
        */}
      <section className='content'>
        <AlbumItem
        /* // ? AlbumItem component
         *   // TODO: make albumItem take album from state.
         *   // TODO: make buttonValue state variable?
         */
          album={album}
          buttonValue={'edit'}
        />
        <section className='btn-group'>
        {/* // ? Add Custom Field button, Edit Fields button
          *   // ! Clicking buttons is broken
          *   // todo: clean out field logic and make it more readable
          */}
          <button
            className='btn'
            onClick={handleAddCustomField}
          >
          {/*   //info shows which button is displayed
            * 
            */}
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
          {/*   //info shows which button is displayed
            * 
            */}
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

        {/*  // INFO: Forms section - contains custom field form and edit form
          * 
          */}
        <section className='custom-fields'>
          {showCustomFields && <CustomFieldForm notifyParent={handleAddCustomField} />}
        </section>

        <section className='edit-fields'>
          {showEditFields && <AlbumEdit notifyParent={handleEditAlbum} />}
        </section>
      </section>
    </>
  )
}

export default AlbumDetails
