// Importing React Hooks
import { useState, useContext, useEffect } from 'react'

// Importing components
import Card from './shared/Card'
import Button from './shared/Button'
import AlbumContext from '../context/AlbumContext'

const AlbumForm = () => {
  // states for the form input fields
  const [album, setAlbum] = useState('')
  const [artist, setArtist] = useState('')
  const [genre, setGenre] = useState('')
  const [year, setYear] = useState('')

  // other states for the form
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const { addAlbum, albumEdit, updateAlbum } = useContext(AlbumContext)

  useEffect(() => {
    if (albumEdit.edit === true) {
      setBtnDisabled(false)
      setAlbum(albumEdit.item.album)
      setArtist(albumEdit.item.artist)
      setGenre(albumEdit.item.genre)
      setYear(albumEdit.item.year)
    }
  }, [albumEdit])

  const handleTextChange = (e) => {
    //const validYear = validateYear(Number(year))

    if (
      album.trim() === '' ||
      artist.trim() === '' ||
      genre.trim() === '' ||
      year.trim() === '' 
    ) {
      setBtnDisabled(true)
      setMessage(null)
      // if (validYear === false) {
      //   setMessage('Please enter a valid release year (1900-Current Year)')
      // }
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }

    switch (e.target.placeholder) {
      case 'Album Name':
        setAlbum(e.target.value)
        break
      case 'Artist Name':
        setArtist(e.target.value)
        break
      case 'Genre':
        setGenre(e.target.value)
        break
      case 'Release Year':
        setYear(e.target.value)
        break
      default:
        break
    }
  }

  // const validateYear = (year) => {
  //   const max = new Date().getFullYear()
  //   const isYearValid = year >= 1900 && year <= max && !isNaN(year) && year.toString().length === 4

  //   return isYearValid
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newAlbum = {
      album,
      artist,
      genre,
      year,
    }

    if (albumEdit.edit === true) {
      updateAlbum(albumEdit.item.id, newAlbum)
      setMessage('Album updated successfully')
    } else {
      addAlbum(newAlbum)
      setMessage('Album added successfully')
    }

    resetInputFields()
    setBtnDisabled(true)
  }

  const resetInputFields = () => {
    setAlbum('')
    setArtist('')
    setGenre('')
    setYear('')
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>Collection Editor</h2>
        <div className='input-group'>
          <div className='input-fields'>
            <input
              onChange={handleTextChange}
              type='text'
              placeholder='Album Name'
              value={album}
            />
            <input
              onChange={handleTextChange}
              type='text'
              placeholder='Artist Name'
              value={artist}
            />
            <input
              onChange={handleTextChange}
              type='text'
              placeholder='Genre'
              value={genre}
            />
            <input
              onChange={handleTextChange}
              type='text'
              placeholder='Release Year'
              value={year}
            />
          </div>

          <Button
            className='input-btn'
            type='submit'
            version='secondary'
            isDisabled={btnDisabled}
          >
            send
          </Button>
        </div>

        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}
export default AlbumForm
