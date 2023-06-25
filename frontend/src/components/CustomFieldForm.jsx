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
    e.preventDefault()

    // check if customKey already exists in album.customFields
    if (customKey in album.customFields) {
      toast.error(`Custom key already exists`)
      return
    }
    // check if customKey or customValue is empty
    if (!customKey || !customValue) {
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

  const handleCancel = (e) => {
    e.preventDefault()
    dispatch(resetFields())
    notifyParent() // ? notify parent to re-render
  }

  return (
    <form onSubmit={(e) => handleAdd(e)}>
      <div className='input-group input-group-md input-group-vertical my-2'>
        <input
          className='input input-bordered input-md'
          type='text'
          name='customKey'
          id='customKey'
          value={customKey}
          placeholder='Enter Custom Key'
          onChange={handleChange}
        />
        <input
          className='input input-bordered input-md my-2'
          type='text'
          name='customValue'
          id='customValue'
          value={customValue}
          placeholder='Enter Custom Value'
          onChange={handleChange}
        />
        <div className=' my-2'>
          <button
            className='btn btn-primary mx-2'
            type='submit'
          >
            Create Field
          </button>
          <button
            className='btn hover:bg-fa-delete mx-2'
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}

export default CustomFieldForm
