import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateAlbum } from '../features/collection/collectionSlice'

function CustomFieldForm({ album }) {
  const [customKey, setCustomKey] = useState('')
  const [customValue, setCustomValue] = useState('')
  const dispatch = useDispatch()

  const handleAddCustomField = (e) => {
    e.preventDefault()

    console.log(`customKey: ${customKey}`)
    console.log(`customValue: ${customValue}`)

    // TODO: check if customKey already exists in album.customFields

    // Create a new object with the customKey and customValue
    const customField = { [customKey]: customValue }
    // Create a new Map object and add the customField object to it
    const updCustomFields = { ...album.customFields, ...customField }

    // Add the new customField to the album.customFields array
    const updAlbum = { ...album, customFields: updCustomFields }

    console.log(`updAlbum: ${JSON.stringify(updAlbum)}`)
    dispatch(updateAlbum(updAlbum))

    // Reset the form
    setCustomKey('')
    setCustomValue('')
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
          onChange={(e) => setCustomKey(e.target.value)}
        />
        <input
          type='text'
          name='customValue'
          id='customValue'
          value={customValue}
          placeholder='Enter Custom Value'
          onChange={(e) => setCustomValue(e.target.value)}
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
