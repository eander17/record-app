/** @format */

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

const AlbumItem = ({ album, buttonValue }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const {
    title,
    artist,
    genre,
    year,
    customFields,
    image,
    _id,
    discogsId,
  } = album

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
      console.error('error')
    }
  }
  /// handleAdd: add album to user's collection
  const handleAdd = () => {
    //? creating album. It won't be changed, so no need to pass destructured vars.
    dispatch(createAlbum(album))

    /// joinAlbumRoom: join the socket room for this album
    joinAlbumRoom({
      discogId: discogsId,
      user: user,
    })
    navigate('/')
  }

  return (
    <div
      className=' relative min-w-[25%] max-w-full border border-solid drop-shadow-xl
     rounded-xl px-4 py-3 mx-4 my-3 mt-12'
    >
      <div className='ml-3 pl-1 pb-1'>
        <CardButtons
          buttonValue={buttonValue}
          handleAdd={handleAdd}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
      <div className='min-w-full flex flex-row items-start'>
        <div className='flex flex-col'>
          <img
            className='pb-2  h-full '
            src={image}
            alt={title}
          />
          {(owned || edit) && (
            <span className='text-xs italic'>
              Date Added:{' '}
              {new Date(album.createdAt).toLocaleDateString('en-US')}
            </span>
          )}
        </div>
        <div className='mx-2 w-2/6 text-center flex flex-col flex-wrap flex-initial text-sm font-medium'>
          <span className='py-1  underline'>{title}</span>
          <span className='py-1'>{artist}</span>
          <span className='py-1'>{genre}</span>
          <span className='py-1'>{year}</span>
        </div>
        {edit
          ? //info: if custom fields exist and has length>0, map over them and display them
            customFields &&
            Object.keys(customFields).length > 0 && (
              <section className='mx-1 w-2/6 text-center flex flex-col flex-initial'>
                <div className='text-sm font-semibold'>
                  Custom Fields:{' '}
                </div>
                {Object.keys(customFields).map((key, index) => {
                  return (
                    <div key={index}>
                      {key}: {customFields[key]}
                    </div>
                  )
                })}
              </section>
            )
          : null}
      </div>
    </div>
  )
}

export default AlbumItem
