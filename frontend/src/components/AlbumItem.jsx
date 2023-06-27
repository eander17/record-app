/** @format */

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
//! Functions
import {
  deleteAlbum,
  createAlbum,
  getCollection,
  reset,
} from '../features/collection/collectionSlice'

// import { joinAlbumRoom } from '../socket'
//! Components

const AlbumItem = ({ album, page }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      <>
        <div
          className='card bg-primary shadow-xl my-12 md:mx-8 mx-4'
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
            <h2 className='card-title text-primary-content'>
              {title}
            </h2>
            <p className='text-primary-content'>{artist}</p>
            <p className='text-primary-content'>{genre}</p>
            <p className='text-primary-content'>{year}</p>
            <p className='text-primary-content'>
              Date Added:
              {new Date(album.createdAt).toLocaleDateString('en-US')}
            </p>
          </div>
        </div>
      </>
    )
  }

  if (page === 'onSearch') {
    const user = useSelector((state) => state.user)
    const { collection, isError, message } = useSelector(
      (state) => state.collection
    )

    useEffect(() => {
      if (isError) console.log(message)

      dispatch(getCollection())

      return () => {
        dispatch(reset())
      }
    }, [dispatch, isError, message])

    const match = collection.find(
      (ownedAlbum) => ownedAlbum.discogsAlbumId === discogsId
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

      //? creating album. It won't be changed, so no need to pass destructured vars.
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
      <>
        <div className='card bg-primary shadow-xl my-12 md:mx-8 mx-4'>
          <figure className=''>
            <img
              src={image}
              alt={trimmedTitle}
              className='h-full w-full'
            />
          </figure>
          <div className='card-body justify-between text-justify '>
            <h2 className='card-title text-primary-content'>
              {trimmedTitle}
            </h2>
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
                  onClick={handleAdd}
                  className='btn btn-square btn-success'
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default AlbumItem

// <button
//   onClick={handleAdd}
//   className='btn btn-square btn-success'
// >
//   Add
// </button>
