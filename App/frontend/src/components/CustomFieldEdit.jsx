import { useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'

//ANCHOR - CustomFieldEdit: 
  //? displays custom fields for editing on AlbumeDetails page. 
  //? called from AlbumEdit component.
  // TODO: 
    // todo make fields prop a state variable?

/// Component CustomFieldEdit
const CustomFieldEdit = ({ onDelete, onChange, fields }) => {

  //info - fields is for user's fields, not emitter fields. 
  //info - fields is an object of key-value pairs.

  // const { fields } = useSelector((state) => state.collection.album)

  if(!fields || Object.values(fields).length === 0) return null 


  return (
    <section className='custom-field-group'>
      {Object.entries(fields).map(([key, value], index) => {
        return (
          <div
            key={index}
            className='text-display custom-field'
          >
            <label className='key' htmlFor={key}>{key}</label>
            <input
              type='text'
              id={key}
              name={key}
              value={value}
              placeholder='Edit value'
              className='value'
              onChange={(e) => onChange(e, key, value)}
            />
            <button className='del-cust'>
              <FaTimes
                className='fa del-btn'
                onClick={(e) => onDelete(e, key)}
              />
            </button>
          </div>
        )
      })}
    </section>
  )
}

export default CustomFieldEdit
