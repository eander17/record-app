/** @format */

import { FaTimes } from 'react-icons/fa'
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types'

// ANCHOR - CustomFieldEdit:
// ? displays custom fields for editing on AlbumDetails page.
// ? called from AlbumEdit component.
/// Component CustomFieldEdit ///
function CustomFieldEdit({ onDelete, onChange, fields }) {
  // info - fields is for user's fields, not emitter fields.
  // info - fields is an object of key-value pairs.

  if (!fields || Object.values(fields).length === 0) return null

  return (
    <section className='mb-4 flex flex-col items-center justify-center'>
      <h3 className='mb-1 mt-4 underline'>Custom Fields</h3>
      {Object.entries(fields).map(([key, value], index) => {
        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
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
              <button
                type='button'
                className='btn btn-md btn-square text-fa-delete hover:text-fa-delete hover:border-fa-delete border border-solid'
              >
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

CustomFieldEdit.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  fields: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default CustomFieldEdit
