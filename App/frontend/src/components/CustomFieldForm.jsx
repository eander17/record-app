import { useDispatch, useSelector } from 'react-redux'
import { updateAlbum } from '../features/collection/collectionSlice' 
import {resetFields, setCustomFields} from '../features/custFields/fieldSlice'
import { emitCustomFieldUpdate } from '../socket'

function CustomFieldForm() {
  const dispatch = useDispatch()

  const { album } = useSelector((state) => state.collection)

  // FIXME: Something here is causing breakage. 
  const { customKey, customValue } = useSelector(
    (state) => state.fields
  )

  const handleChange = () => {
    dispatch(setCustomFields({ customKey, customValue }))
  }

  const handleAddCustomField = (e) => {
    e.preventDefault()

    console.log(`in handleAddCustomField`)
    console.log(`customKey: ${customKey}`)
    console.log(`customValue: ${customValue}`)

    // check if customKey already exists in album.customFields
    if (customKey in album.customFields) {
      console.log(`customKey already exists`)
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

    dispatch(resetFields())
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
