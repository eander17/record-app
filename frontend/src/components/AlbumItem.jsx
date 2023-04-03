import { FaTimes, FaEdit } from 'react-icons/fa'
import { useContext } from 'react'
import { PropTypes } from 'prop-types'

// Importing components
import Card from './shared/Card'
import AlbumContext from '../context/AlbumContext'

function AlbumItem({ item }) {
  const { deleteAlbum, editAlbum } = useContext(AlbumContext)

  return (
    <Card>
      <button className='close'>
        <FaTimes onClick={() => deleteAlbum(item.id)} />
      </button>
      <button className='edit'>
        <FaEdit onClick={() => editAlbum(item)} />
      </button>
      <div className='text-display'>{item.album}</div>
      <div className='text-display'>{item.artist}</div>
      <div className='text-display'>{item.genre}</div>
      <div className='text-display'>{item.year}</div>
    </Card>
  )
}

AlbumItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default AlbumItem
