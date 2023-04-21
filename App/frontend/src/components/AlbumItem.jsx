import { useDispatch } from 'react-redux'
import { FaTimes, FaEdit, FaPlus } from 'react-icons/fa'
import { deleteAlbum, createAlbum } from '../features/collection/collectionSlice'
import { useNavigate } from 'react-router-dom'

const AlbumItem = ({ album, handleEdit, owned }) => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()



  const handleAdd = (album) => {
    dispatch(createAlbum(album))
    Navigate('/')
  }

  return (
    <div className='album card'>
      {owned ? (
        <>
          
          <button className='close'>
            <FaTimes onClick={() => dispatch(deleteAlbum(album._id))} />
          </button>
          <button className='edit'>
            <FaEdit onClick={() => handleEdit(album)} />
          </button>
        </>
      ) : (
        <button className='add'><FaPlus onClick={() => handleAdd(album)} /> </button>
      )}

      <img
        src={album.image}
        alt={album.title}
      />
      <div className='text-display'>{album.title}</div>
      <div className='text-display'>{album.artist}</div>
      <div className='text-display'>{album.genre}</div>
      <div className='text-display'>{album.year}</div>
      {owned ? <div>Date Created: {new Date(album.createdAt).toLocaleDateString('en-US')}</div> : null}
    </div>
  )
}

export default AlbumItem
