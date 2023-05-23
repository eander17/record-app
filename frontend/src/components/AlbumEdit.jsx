/** @format */

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FaSave } from 'react-icons/fa'
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
        className='flex flex-col items-center justify-center'
      >
        <section className='mb-2 mt-2'>
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
        <button className='flex flex-row items-center btn px-4  '>
          <FaSave className='text-fa-save' />
          <span className='px-2 py-1'>Save</span>
        </button>
      </form>
    </section>
  )
}

export default AlbumEdit
