/** @format */

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types'
//! Functions
import {
  // eslint-disable-next-line no-unused-vars
  deleteAlbum,
  createAlbum,
  getCollection,
  reset,
} from '../features/collection/collectionSlice'

// import { joinAlbumRoom } from '../socket'
//! Components

function AlbumItem({ album, page }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // eslint-disable-next-line no-unused-vars
  const { title, artist, genre, year, customFields, image, _id, discogsId } =
    album

  /// handleEdit: navigates to albumDetails page
  const handleEdit = () => {
    try {
      navigate(`/edit/${_id}`) // navigate to user's album details page.
    } catch {
      console.error('error')
    }
  }

  if (page === 'onDash') {
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
      <div
        className='card bg-primary mx-4 my-12 shadow-xl md:mx-8'
        onClick={handleEdit}
      >
        <figure className=''>
          <img
            src={image}
            alt={title}
            className='h-full w-full'
          />
        </figure>
        <div className='card-body justify-between text-justify'>
          <h2 className='card-title text-primary-content'>{title}</h2>
          <p className='text-primary-content'>{artist}</p>
          <p className='text-primary-content'>{genre}</p>
          <p className='text-primary-content'>{year}</p>
        </div>
      </div>
    )
  }

  if (page === 'onSearch') {
    // const user = useSelector((state) => state.user)
    const { collection, isError, message } = useSelector(
      (state) => state.collection,
    )

    useEffect(() => {
      if (isError) console.log(message)

      dispatch(getCollection())

      return () => {
        dispatch(reset())
      }
    }, [dispatch, isError, message])

    const match = collection.find(
      (ownedAlbum) => ownedAlbum.discogsAlbumId === discogsId,
    )

    const trimmedTitle = title
      .trim()
      .replace(/\t/g, ' ')
      .replace(/[^\S\r\n]+/g, ' ')
    const trimmedArtist = artist
      .trim()
      .replace(/\t/g, ' ')
      .replace(/[^\S\r\n]+/g, ' ')
    const trimmedGenre = genre
      .trim()
      .replace(/\t/g, ' ')
      .replace(/[^\S\r\n]+/g, ' ')

    /// handleAdd: add album to user's collection
    const handleAdd = () => {
      const trimmedAlbum = {
        ...album,
        title: trimmedTitle,
        artist: trimmedArtist,
        genre: trimmedGenre,
      }

      // ? creating album. It won't be changed, so no need to pass destructured vars.
      dispatch(createAlbum(trimmedAlbum))
      toast.success('Album added to your collection!')
      // /// joinAlbumRoom: join the socket room for this album
      // joinAlbumRoom({
      //   discogId: discogsId,
      //   user: user,
      // })
      // navigate('/')
    }

    return (
      <div className='card bg-primary mx-4 my-12 shadow-xl md:mx-8'>
        <figure className=''>
          <img
            src={image}
            alt={trimmedTitle}
            className='h-full w-full'
          />
        </figure>
        <div className='card-body justify-between text-justify '>
          <h2 className='card-title text-primary-content'>{trimmedTitle}</h2>
          <p className='text-primary-content'>{trimmedArtist}</p>
          <p className='text-primary-content'>{trimmedGenre}</p>
          <p className='text-primary-content'>{year}</p>
          <div className='card-actions justify-end'>
            {match ? (
              <div className='badge badge-secondary badge-lg text-secondary-content gap-2'>
                In Collection
              </div>
            ) : (
              <button
                type='button'
                onClick={handleAdd}
                className='btn btn-square btn-success'
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
}

AlbumItem.propTypes = {
  album: PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    customFields: PropTypes.arrayOf(PropTypes.object).isRequired,
    image: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    discogsId: PropTypes.number.isRequired,
  }).isRequired,
  page: PropTypes.string.isRequired,
}

export default AlbumItem
