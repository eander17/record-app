import { useDispatch } from 'react-redux'
import {
  deleteAlbum,
  createAlbum,
} from '../features/collection/collectionSlice'
import { useNavigate } from 'react-router-dom'
import CardButtons from './CardButtons'

const AlbumItem = ({ album, buttonValue }) => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()

  console.log(buttonValue)

  const owned = buttonValue === 'owned'

  const handleDelete = () => {
    dispatch(deleteAlbum(album._id))
    Navigate('/')
  }

  const handleEdit = () => {
    Navigate(`/edit/${album._id}`)
  }
  const handleAdd = () => {
    dispatch(createAlbum(album))
    Navigate('/')
  }

  return (
    <div className='album card'>
      <CardButtons
        buttonValue={buttonValue}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <img
        src={album.image}
        alt={album.title}
      />
      <div className='text-display'>{album.title}</div>
      <div className='text-display'>{album.artist}</div>
      <div className='text-display'>{album.genre}</div>
      <div className='text-display'>{album.year}</div>
      {owned ? (
        <div>
          Date Created: {new Date(album.createdAt).toLocaleDateString('en-US')}
        </div>
      ) : null}
    </div>
  )
}

export default AlbumItem
