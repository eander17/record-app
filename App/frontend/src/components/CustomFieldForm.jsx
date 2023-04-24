import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateAlbum } from '../features/collection/collectionSlice'
import {setCustomFields} from '../features/collection/fieldsSlice'
import { emitCustomFieldUpdate } from '../socket'

function CustomFieldForm({ album }) {
  const dispatch = useDispatch()

  const customKey  = useSelector(
    (state) => state.fields.customKey
  )
  const  customValue  = useSelector(
    (state) => state.fields.customValue
  )
  // const [customKey, setCustomKey] = useState('')
  // const [customValue, setCustomValue] = useState(valueFromRedux)

  const handleChange = () => {
    dispatch(setCustomFields({ customKey, customValue }))
  }


  const handleAddCustomField = (e) => {
    e.preventDefault()

    console.log(`in handleAddCustomField`)
    console.log(`customKey: ${customKey}`)
    console.log(`customValue: ${customValue}`)

    // TODO: check if customKey already exists in album.customFields

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

    // // Reset the form
    // setCustomKey('')
    // setCustomValue('')
  }

  return (
    <form onSubmit={handleAddCustomField}>
      <div className='form-group'>
        <input
          type='text'
          name='customKey'
          id='customKey'
          value={customKey}
          placeholder='Enter Custom Key'
          onChange={handleChange}
        />
        <input
          type='text'
          name='customValue'
          id='customValue'
          value={customValue}
          placeholder='Enter Custom Value'
          onChange={handleChange}
        />
        <button
          type='submit'
          className='btn'
        >
          Add Custom Field
        </button>
      </div>
    </form>
  )
}

export default CustomFieldForm
