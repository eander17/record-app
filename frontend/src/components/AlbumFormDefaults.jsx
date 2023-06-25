/** @format */

const AlbumFormDefaults = ({ fields, onChange }) => {
  const { title, artist, genre, year } = fields

  // only allow numbers to be entered into year field
  // this might be problematic.
  const handleYearChange = (e) => {
    const { value } = e.target
    const yearRegex = /^[0-9\b]+$/

    if (value === '' || yearRegex.test(value)) {
      onChange(e, 'year')
    }
  }

  return (
    <div className='input-group input-group-md input-group-vertical'>
      <div className='input-group my-1'>
        <span>Title</span>
        <input
          className='input input-bordered input-md'
          required
          type='text'
          name='title'
          id='title'
          value={title}
          placeholder='Enter Album Title'
          onChange={(e) => onChange(e, 'title')}
        />
      </div>
      <div className='input-group my-1'>
        <span>Artist</span>
        <input
          className='input input-bordered input-md'
          required
          type='text'
          name='artist'
          id='artist'
          value={artist}
          placeholder='Enter Artist Name'
          onChange={(e) => onChange(e, 'artist')}
        />
      </div>
      <div className='input-group my-1'>
        <span>Genre</span>
        <input
          className='input input-bordered input-md'
          required
          type='text'
          name='genre'
          id='genre'
          placeholder='Enter Genre'
          value={genre}
          onChange={(e) => onChange(e, 'genre')}
        />
      </div>
      <div className='input-group my-1'>
        <span>Year</span>
        <input
          className='input input-bordered input-md'
          required
          type='text'
          name='year'
          id='year'
          placeholder='Enter Release Year'
          value={year}
          onChange={handleYearChange}
        />
      </div>
    </div>
  )
}

export default AlbumFormDefaults
