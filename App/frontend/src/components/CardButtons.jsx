import {FaTimes, FaEdit, FaPlus} from 'react-icons/fa'


function CardButtons({ buttonValue, handleAdd, handleEdit, handleDelete }) {
  
  if (buttonValue === 'edit') {
    return <> </>
  }

  if (buttonValue === 'add') {
    return (
      <>
        <button className='add'>
            <FaPlus className='fa plus-btn' onClick={handleAdd} />
        </button>
      </>
    )
  }

  if (buttonValue === 'owned') {
      return (
        <>
          <button className="close">
            <FaTimes className="fa del-btn" onClick={handleDelete} />
          </button>
          <button className="edit">
            <FaEdit className="fa edit-btn" onClick={handleEdit} />
          </button>
        </>
      )
  }
}

export default CardButtons
