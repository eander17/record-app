import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaPlus, FaEdit } from 'react-icons/fa'
import { getAlbumById, reset } from '../features/collection/collectionSlice'
import Spinner from '../components/Spinner'

import AlbumItem from '../components/AlbumItem'

function AlbumDetails() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { id } = useParams()
  const { user } = useSelector((state) => state.auth)
  const { album, isLoading, isError, message } = useSelector(
    (state) => state.collection
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    // if user is not logged in, redirect to login page
    if (!user) {
      navigate('/login')
    } else {
      dispatch(getAlbumById(id))
    }
    // triggered when component unmounts
    return () => {
      dispatch(reset())
    }
  }, [dispatch, id, navigate, user, isError, message])

  if (!album) {
    return <h1>Album not found</h1>
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Details: {user && user.name}</h1>
        <p>Your Collection</p>
      </section>
      <section className='content'>
        <AlbumItem
          album={album}
          buttonValue={'edit'}
        />
        <section className='btn-group'>
          <button className='btn'>
            <FaPlus className='fa plus-btn' /> Add Custom Field
          </button>
          <button className='btn'>
            <FaEdit className='fa edit-btn' /> Edit Fields
          </button>
        </section>
      </section>
    </>
  )
}

export default AlbumDetails
