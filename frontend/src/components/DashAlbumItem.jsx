/** @format */

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { setAlbum } from '../features/collection/collectionSlice'

function DashAlbumItem({ album }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // eslint-disable-next-line no-unused-vars
  const { title, artist, genre, year, image, _id } = album

  /// handleEdit: navigates to albumDetails page
  const handleEdit = () => {
    try {
      dispatch(setAlbum(album)) // set album in collectionSlice
      navigate(`/edit/${_id}`) // navigate to user's album details page.
    } catch {
      console.error('error')
      toast.error('Error loading album details')
    }
  }

  return (
    // todo - change to edit button instead of div click for accessibility
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className='card bg-primary mx-4 my-12 shadow-xl md:mx-8'
      onClick={handleEdit}
      onKeyDown={handleEdit}
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

DashAlbumItem.propTypes = {
  album: PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    discogsId: PropTypes.number.isRequired,
  }).isRequired,
}

export default DashAlbumItem
