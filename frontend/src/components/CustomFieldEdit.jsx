/** @format */

import { FaTimes } from 'react-icons/fa'

//ANCHOR - CustomFieldEdit:
//? displays custom fields for editing on AlbumeDetails page.
//? called from AlbumEdit component.
/// Component CustomFieldEdit ///
const CustomFieldEdit = ({ onDelete, onChange, fields }) => {
  //info - fields is for user's fields, not emitter fields.
  //info - fields is an object of key-value pairs.

  if (!fields || Object.values(fields).length === 0) return null

  return (
    <section className='mb-4 flex flex-col justify-center items-center'>
      <h3 className='underline mt-4 mb-1'>Custom Fields</h3>
      {Object.entries(fields).map(([key, value], index) => {
        return (
          <div
            key={index}
            className='form-control '
          >
            <label
              className='input-group input-group-md rounded-xl'
              htmlFor={key}
            >
              <span>{key}:</span>
              <input
                type='text'
                id={key}
                name={key}
                value={value}
                placeholder='Edit value'
                className='input input-bordered input-md'
                onChange={(e) => onChange(e, key)}
              />
              <button className='btn btn-md btn-square text-fa-delete hover:text-fa-delete hover:border-fa-delete border-solid border'>
                <FaTimes
                  className='text-xl'
                  onClick={(e) => onDelete(e, key)}
                />
              </button>
            </label>
          </div>
        )
      })}
    </section>
  )
}

export default CustomFieldEdit
