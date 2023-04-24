import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createAlbum, updateAlbum } from '../features/collection/collectionSlice'

const AlbumForm = ({ albumData, onUpdate }) => {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [genre, setGenre] = useState('')
  const [year, setYear] = useState('')
  const [editMode, setEditMode] = useState(false)
  

  const dispatch = useDispatch()

  useEffect(() => {
    if (albumData !== null) {
      setEditMode(true)
      setTitle(albumData.title)
      setArtist(albumData.artist)
      setGenre(albumData.genre)
      setYear(albumData.year)
    }
  }, [albumData])

  const onSubmit = async (e) => {
    e.preventDefault()

     editMode === true 
      ? await dispatch(updateAlbum({id: albumData._id, title, artist, genre, year }))
      : await dispatch(createAlbum({ title, artist, genre, year }))
    onUpdate(true)
    resetFields()
  }

  const handleCancel = (e) => {
    e.preventDefault()
    onUpdate(false)
    resetFields()
  }

  // only allow numbers to be entered into year field
  // this might be problematic.
  const handleYearChange = (e) => {
    const { value } = e.target
    const yearRegex = /^[0-9\b]+$/

    if (value === '' || yearRegex.test(value)) {
      setYear(value)
    }
  }

  // set albumForm fields to value passed in
  const resetFields = () => {
    setEditMode(false)
    setTitle('')
    setArtist('')
    setGenre('')
    setYear('')
  }

  return (
    <section className='form'>
      <form
        onSubmit={onSubmit}
        action=''
      >
        <div className='form-group'>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            placeholder='Enter Album Title'
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type='text'
            name='artist'
            id='artist'
            value={artist}
            placeholder='Enter Artist Name'
            onChange={(e) => setArtist(e.target.value)}
          />
          <input
            type='text'
            name='genre'
            id='genre'
            placeholder='Enter Genre'
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <input
            type='text'
            name='year'
            id='year'
            placeholder='Enter Release Year'
            value={year}
            onChange={handleYearChange}
          />
        </div>
        <div className='form-group'>
          <button
            className='btn btn-block'
            type='submit'
          >
          {editMode ? 'Edit Album' : 'Add Album'}
          </button>

        </div>
      </form>
      <button
            className='btn btn-block'
            type='button'
            onClick={(e) => handleCancel(e)}
          >
          Cancel
          </button>
    </section>
  )
}

export default AlbumForm
