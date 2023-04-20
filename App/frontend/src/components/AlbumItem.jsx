import { useDispatch } from 'react-redux'
import { FaTimes, FaEdit } from 'react-icons/fa'
import {  deleteAlbum } from '../features/collection/collectionSlice'


const AlbumItem = ({ album, handleEdit }) => {
  const dispatch = useDispatch()
  
  const safeAlbum= album 

  return (
    <div className='album card'>
      <div>{new Date(album.createdAt).toLocaleDateString('en-US')}</div> 
      <button className='close'>
        <FaTimes onClick={() => dispatch(deleteAlbum(album._id))} />
      </button>
      <button className='edit'>
        <FaEdit onClick={() => handleEdit(safeAlbum)} />
      </button>

      <div className='text-display'>{album.title}</div>
      <div className='text-display'>{album.artist}</div>
      <div className='text-display'>{album.genre}</div>
      <div className='text-display'>{album.year}</div>
    </div>
  )
}

export default AlbumItem
