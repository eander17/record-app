/** @format */

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setAlbum } from '../features/collection/albumSlice'

function DashAlbumItem({ album }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // eslint-disable-next-line no-unused-vars
  const { title, artist, genres, year, image } = album

  /// handleEdit: navigates to albumDetails page
  const handleAlbumClick = () => {
    try {
      dispatch(setAlbum(album))
      const urlTitle = title.replace(/\s+/g, '-').toLowerCase()
      navigate(`/albums/${urlTitle}`) // navigate to user's album details page.
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
      onClick={handleAlbumClick}
      onKeyDown={handleAlbumClick}
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
        <p className='text-primary-content'>{genres}</p>
        <p className='text-primary-content'>{year}</p>
      </div>
    </div>
  )
}

DashAlbumItem.propTypes = {
  album: PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    year: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    discogsId: PropTypes.number.isRequired,
  }).isRequired,
}

export default DashAlbumItem
