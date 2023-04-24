import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//! Functions
import {
  deleteAlbum,
  createAlbum,
} from '../features/collection/collectionSlice'
import { joinAlbumRoom } from '../socket'
//! Components
import CardButtons from './CardButtons'

//ANCHOR - AlbumItem: displays album information
  //? details: 
    //! does not change data. 
  //? action: 
    // 1. displays album information.
    // 2. dispatches add, and delete. 
    // 3. navigates to album details page.
    // 4. emits joinAlbumRoom event. 
  // info: Called by: 
    // 1. Dashboard (root page)
    // 2. AlbumDetails (album details page)
    // 3. SearchResults (lists results from discogs query)    
const AlbumItem = ({ album, buttonValue }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  // const { album } = useSelector((state) => state.collection)
  //! pretty sure discogsId is wrong, and should be discogsAlbumId. I'm just following what I previously had in here. 
  const { title, artist, genre, year, customFields, image,  _id, discogsId } = album

  // REVIEW - is this the best way to handle this?
  const owned = buttonValue === 'owned'
  const edit = buttonValue === 'edit'

  /// handleDelete: deletes album from user's collection
  const handleDelete = () => {
    dispatch(deleteAlbum(_id)) // id === album's id
    navigate('/')
  }

  /// handleEdit: navigates to albumDetails page
  const handleEdit = () => {
    try {
      navigate(`/edit/${_id}`) // navigate to user's album details page. 
    } catch {
      console.log('error')
    }
  }
  /// handleAdd: add album to user's collection
  const handleAdd = () => {
    //? creating album. It won't be changed, so no need to pass destructured vars. 
    dispatch(createAlbum(album))

    console.log(
      `hi from albumItem album.discogsId: ${discogsId} album.user: ${user}`
    )

    /// joinAlbumRoom: join the socket room for this album
    joinAlbumRoom({
      discogId: discogsId,
      user: user,
    })
    navigate('/')
  }

  // REVIEW - Can I clean this up? 
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
          src={image}
          alt={title}
        />
        <section className='default-fields'>
          <div className='text-display'>{title}</div>
          <div className='text-display'>{artist}</div>
          <div className='text-display'>{genre}</div>
          <div className='text-display'>{year}</div>
          {owned ? (
            <div>
              Date Created:{' '}
              {new Date(album.createdAt).toLocaleDateString('en-US')}
            </div>
          ) : null}
        </section>
        {edit ? (
          //info: if fields exist and has length>0, map over them and display them
          customFields && Object.keys(customFields).length > 0 ? (
            <section className='custom-fields'>
              <div className='text-display custom-fields'>Custom Fields: </div>
              {Object.keys(customFields).map((key, index) => {
                return (
                  <div
                    key={index}
                    className='text-display'
                  >
                    {key}: {customFields[key]}
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
