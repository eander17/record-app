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
      <h3 className='dark:text-stark text-fuschia-custom text-sm underline dark:decoration-fuschia-custom decoration-jewel mt-4'>
        Custom Fields
      </h3>
      {Object.entries(fields).map(([key, value], index) => {
        return (
          <form
            key={index}
            className='flex flex-row my-2 '
          >
            <label
              className='bg-void text-stark rounded-md p-2 pr-4 text-xs '
              htmlFor={key}
            >
              {key}:
            </label>
            <input
              type='text'
              id={key}
              name={key}
              value={value}
              placeholder='Edit value'
              className='rounded-sm'
              onChange={(e) => onChange(e, key)}
            />
            <button className='btn p-2.5 rounded-md pl-3 text-fa-delete hover:text-fa-delete hover:border-fa-delete border-solid border border-void'>
              <FaTimes
                className='text-md'
                onClick={(e) => onDelete(e, key)}
              />
            </button>
          </form>
        )
      })}
    </section>
  )
}

export default CustomFieldEdit
