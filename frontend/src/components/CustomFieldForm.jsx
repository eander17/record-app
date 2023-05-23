/** @format */

import { useDispatch, useSelector } from 'react-redux'
import { updateAlbum } from '../features/collection/collectionSlice'
import { toast } from 'react-toastify'
import {
  resetFields,
  setCustomFields,
} from '../features/custFields/fieldSlice'
import { emitCustomFieldUpdate } from '../socket'

function CustomFieldForm({ notifyParent }) {
  const dispatch = useDispatch()

  const { album } = useSelector((state) => state.collection)

  const { customKey, customValue } = useSelector(
    (state) => state.custFields
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch(setCustomFields({ [name]: value }))
  }

  /// FUNCTION: handleAddCustomField - adds a custom field to the album
  const handleAdd = (e) => {
    console.log(`in handleAddCustomField value of e: ${e}`)
    e.preventDefault()

    // check if customKey already exists in album.customFields
    if (customKey in album.customFields) {
      console.log(`customKey already exists`)
      toast.error(`Custom key already exists`)
      return
    }
    // check if customKey or customValue is empty
    if (!customKey || !customValue) {
      console.log(`customKey or customValue is empty`)
      toast.error(`cannot submit empty fields`)
      return
    }

    // Create a new object with the customKey and customValue
    const customField = { [customKey]: customValue }
    // Create a new Map object and add the customField object to it
    const updCustomFields = { ...album.customFields, ...customField }

    // Add the new customField to the album.customFields array
    const updAlbum = { ...album, customFields: updCustomFields }

    dispatch(updateAlbum(updAlbum))

    emitCustomFieldUpdate({
      discogId: updAlbum.discogsAlbumId,
      user: updAlbum.user,
      key: customKey,
      value: customValue,
    })
    notifyParent()
    dispatch(resetFields())
  }

  return (
    <form onSubmit={(e) => handleAdd(e)}>
      <div className='mb-1 mt-2 flex flex-col '>
        <input
          className='mb-1 mt-2 rounded-lg border border-solid border-gray-500 text-sm py-1.5 px-2 pl-3'
          type='text'
          name='customKey'
          id='customKey'
          value={customKey}
          placeholder='Enter Custom Key'
          onChange={handleChange}
        />
        <input
          className='mb-1 mt-2 rounded-lg border border-solid border-gray-500 text-sm py-1.5 px-2 pl-3'
          type='text'
          name='customValue'
          id='customValue'
          value={customValue}
          placeholder='Enter Custom Value'
          onChange={handleChange}
        />
        <button
          className='text-sm px-1 py-1 btn mb-1 mt-2'
          type='submit'
        >
          Add Custom Field
        </button>
      </div>
    </form>
  )
}

export default CustomFieldForm
