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
    <section className='flex flex-col my-1 mx-1 max-w-[40%] items-start justify-center'>
      <input
        className='my-1 rounded-md py-2 px-5 text-sm font-medium border border-solid border-slate-400'
        required
        type='text'
        name='title'
        id='title'
        value={title}
        placeholder='Enter Album Title'
        onChange={(e) => onChange(e, 'title')}
      />
      <input
        className='my-1 rounded-md py-2 px-5 text-sm font-medium border border-solid border-slate-400'
        required
        type='text'
        name='artist'
        id='artist'
        value={artist}
        placeholder='Enter Artist Name'
        onChange={(e) => onChange(e, 'artist')}
      />
      <input
        className='my-1  rounded-md py-2 px-5 text-sm font-medium border border-solid border-slate-400'
        required
        type='text'
        name='genre'
        id='genre'
        placeholder='Enter Genre'
        value={genre}
        onChange={(e) => onChange(e, 'genre')}
      />
      <input
        className='my-1  rounded-md py-2 px-5 text-sm font-medium border border-solid border-slate-400'
        required
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
