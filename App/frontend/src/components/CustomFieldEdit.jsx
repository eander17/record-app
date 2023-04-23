import { FaTimes } from 'react-icons/fa'

const CustomFieldEdit = ({ fields, onDelete, onChange }) => {


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
              id={value}
              name={value}
              value={value}
              placeholder='Edit value'
              className='value'
              onChange={(e) => onChange(e, key, value)}
            />
            <button className='del-cust'>
              <FaTimes
                className='fa del-btn'
                onClick={(e) => onDelete(key)}
              />
            </button>
          </div>
        )
      })}
    </section>
  )
}

export default CustomFieldEdit
