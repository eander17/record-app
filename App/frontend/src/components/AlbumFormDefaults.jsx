
const AlbumFormDefaults = ({ 
  title,
  setTitle,
  artist,
  setArtist,
  genre,
  setGenre,
  year,
  setYear,
 }) => {

  // only allow numbers to be entered into year field
  // this might be problematic.
  const handleYearChange = (e) => {
    const { value } = e.target
    const yearRegex = /^[0-9\b]+$/

    if (value === '' || yearRegex.test(value)) {
      setYear(value)
    }
  }


  return (
    <section className='form-default-fields'>
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
    </section>
  )
}

export default AlbumFormDefaults
