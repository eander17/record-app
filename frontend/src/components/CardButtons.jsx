/** @format */

import { FaTimes, FaEdit, FaPlus } from 'react-icons/fa'

function CardButtons({
  buttonValue,
  handleAdd,
  handleEdit,
  handleDelete,
}) {
  if (buttonValue === 'edit') {
    return <> </>
  }

  if (buttonValue === 'add') {
    return (
      <div className='absolute top-1 right-1 mb-2'>
        <button className='text-fa-plus'>
          <FaPlus onClick={handleAdd} />
        </button>
      </div>
    )
  }

  if (buttonValue === 'owned') {
    return (
      <div className='absolute flex flex-row  top-1 right-1 pt-2 pr-2'>
        <button className='text-fa-delete mx-1'>
          <FaTimes onClick={handleDelete} />
        </button>
        <button className='text-fa-edit px-1'>
          <FaEdit onClick={handleEdit} />
        </button>
      </div>
    )
  }

  return null
}

export default CardButtons
