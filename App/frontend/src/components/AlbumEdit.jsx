import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaSave } from 'react-icons/fa'
import { updateAlbum } from '../features/collection/collectionSlice'
import AlbumFormDefaults from './AlbumFormDefaults'
import CustomFieldEdit from './CustomFieldEdit'

function CustomFieldForm({ album }) {
  const dispatch = useDispatch()

  const [title, setTitle] = useState(album.title)
  const [artist, setArtist] = useState(album.artist)
  const [genre, setGenre] = useState(album.genre)
  const [year, setYear] = useState(album.year)
  const [customFields, setCustomFields] = useState(album.customFields)

  const handleSubmit = (e) => {
    e.preventDefault()
    

    const updAlbum = {
      ...album, 
      title,
      artist,
      genre,
      year,
      customFields
    }

    dispatch(updateAlbum(updAlbum))
    
  }

  const handleDelete = (e, key) => {
    e.preventDefault()
    setCustomFields((prev) => 
    Object.fromEntries(Object.entries(prev).filter(([k, v]) => k !== key))
  )
    console.log(e)
  }

  const handleFieldChange = (e, key) => {
    const { value } = e.target

    setCustomFields((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <section className='form'>
      <form
        action=''
        onSubmit={handleSubmit}
      >
        <section className='form-group'>
          <AlbumFormDefaults
            title={title}
            setTitle={setTitle}
            artist={artist}
            setArtist={setArtist}
            genre={genre}
            setGenre={setGenre}
            year={year}
            setYear={setYear}
          />
          {Object.keys(customFields).length > 0 && (
            <CustomFieldEdit
              fields={customFields}
              onChange={handleFieldChange}
              onDelete={handleDelete}
            />
          )}
        </section>
        <button className="edit-submit" >
          <FaSave className="fa save-btn" />Save Changes
        </button>
      </form>
    </section>
  )
}

export default CustomFieldForm
