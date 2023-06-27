/** @format */

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { updateAlbum } from '../features/collection/collectionSlice'
import AlbumFormDefaults from './AlbumFormDefaults'
import CustomFieldEdit from './CustomFieldEdit'

// ANCHOR - AlbumEdit - Component
//? details:
// allows user to edit an album object.
//! manipulates the album object
//? actions:
// 1. delete custom field
// 2. update album object
//? Called in:
// 1. AlbumDetails.jsx
//? Children:
// 1. AlbumFormDefaults.jsx
// 2. CustomFieldEdit.jsx
//? States:
// 1. collection:
// a. album: title, artist, genre, year, customFields
function AlbumEdit({ notifyParent }) {
  const dispatch = useDispatch()

  const { album } = useSelector((state) => state.collection)

  // set to true if album has customFields
  const anyCustomFields =
    album.customFields && Object.values(album.customFields).length > 0

  const [data, setData] = useState({
    title: album.title,
    artist: album.artist,
    genre: album.genre,
    year: album.year,
    ...(anyCustomFields ? { customFields: album.customFields } : {}),
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    // if any of the required fields are empty, return
    if (emptyFields()) {
      toast.error('Cannot submit empty fields')
      return
    }

    notifyParent() // notify parent to close modal
    dispatch(updateAlbum({ ...album, ...data }))
  }

  const handleDelete = (e, key) => {
    e.preventDefault()
    // filter out customField to be deleted.
    const newCustomFields = Object.fromEntries(
      Object.entries(data.customFields).filter(([k]) => k !== key)
    )
    // update albumData state with new customFields object
    setData({ ...data, customFields: newCustomFields })
  }

  const handleDefaultsChange = (e, key) => {
    const { value } = e.target
    // update albumData state with new value
    setData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleCustomChange = (e, key) => {
    const { value } = e.target
    // update albumData state with new value
    setData((prev) => ({
      ...prev,
      customFields: {
        ...prev.customFields,
        [key]: value,
      },
    }))
  }

  const handleCancel = (e) => {
    e.preventDefault()
    notifyParent()
  }

  const emptyFields = () => {
    return Object.values(data).some(
      (value) => value === '' || value === null
    )
  }

  return (
    <section>
      <form
        action=''
        onSubmit={handleSubmit}
        className='input-group-vertical py-4'
      >
        <section>
          <AlbumFormDefaults
            onChange={handleDefaultsChange}
            fields={data}
          />
          {anyCustomFields && (
            <CustomFieldEdit
              onChange={handleCustomChange}
              onDelete={handleDelete}
              fields={data.customFields}
            />
          )}
        </section>
        <div className='flex flex-row justify-center my-2'>
          <button
            className='btn btn-primary mx-2'
            type='submit'
          >
            Save
          </button>
          <button
            className='btn hover:bg-fa-delete mx-2'
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}

export default AlbumEdit
