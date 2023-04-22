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

  const owned = buttonValue === 'owned'
  const edit = buttonValue === 'edit'


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

      <section className='album-data'>
        <img
          src={album.image}
          alt={album.title}
        />
        <section className='default-fields'>
          <div className='text-display'>{album.title}</div>
          <div className='text-display'>{album.artist}</div>
          <div className='text-display'>{album.genre}</div>
          <div className='text-display'>{album.year}</div>
          {owned ? (
            <div>
              Date Created:{' '}
              {new Date(album.createdAt).toLocaleDateString('en-US')}
            </div>
          ) : null}
        </section>
        {edit ? (
          Object.keys(album.customFields).length > 0 ? (
            <section className='custom-fields'>
              <div className="text-display custom-fields">Custom Fields:</div>
              {Object.keys(album.customFields).map((key, index) => {
                return (
                  <div
                    key={index}
                    className='text-display'
                  >
                    {key}: {album.customFields[key]}
                  </div>
                )
              })}
            </section>
          ) : (
            <div className='text-display custom-fields'>No custom fields</div>
          )
        ) : null}
      </section>
    </div>
  )
}

export default AlbumItem
