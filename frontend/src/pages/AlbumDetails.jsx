/** @format */

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

  const { id } = useParams() //! need to do because store doesn't have album yet.
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
    <div className='flex flex-col items-center'>
      {/*     //? End of heading section
       *    //? Start of content section - contains album item and forms
       */}
      <section className='flex flex-col items-center justify-center mx-auto my-0'>
        <AlbumItem
          /* // ? AlbumItem component
           *   // TODO: make albumItem take album from state.
           *   // TODO: make buttonValue state variable?
           */
          album={album}
          buttonValue={'edit'}
        />
        <section className='flex justify-center flex-row items-center mt-1'>
          {/* // ? Add Custom Field button, Edit Fields button
           *   // todo: clean out field logic and make it more readable
           */}
          <button
            className='btn mx-2 p-1'
            onClick={handleAddCustomField}
          >
            {showCustomFields ? (
              <div className='p-1.5'>
                {' '}
                <FaTimes className='text-fa-delete' />
              </div>
            ) : (
              <div className='group p-1 flex flex-row-reverse items-center'>
                <FaPlus className='text-lg text-fa-plus group' />
                <span className='tooltip group-hover:scale-100 mr-8 p-1.5'>
                  Add Custom Field
                </span>
              </div>
            )}
          </button>
          <button
            className='btn  mx-2 p-1'
            onClick={handleEditAlbum}
          >
            {/*   //info shows which button is displayed
             *
             */}
            {showEditFields ? (
              <div className='rounded-lg p-1.5'>
                {' '}
                <FaTimes className='text-fa-delete' />
              </div>
            ) : (
              <div className='group px-1.5  py-1.5 flex flex-row items-center'>
                {' '}
                <FaEdit className=' text-md  text-fa-edit group' />
                <span className='tooltip group-hover:scale-100 ml-8'>
                  Edit Album
                </span>
              </div>
            )}
          </button>
        </section>

        {/*  // INFO: Forms section - contains custom field form and edit form
         *
         */}
        <section className='flex flex-col items-center justify-center'>
          {showCustomFields && (
            <CustomFieldForm notifyParent={handleAddCustomField} />
          )}
        </section>

        <section className='flex flex-col justify-center'>
          {showEditFields && (
            <AlbumEdit notifyParent={handleEditAlbum} />
          )}
        </section>
      </section>
    </div>
  )
}

export default AlbumDetails
