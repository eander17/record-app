
const AlbumFormDefaults = ({fields, onChange}) => {

  /*  // FIXME: list of things to fix in this component:
   *    // ! 1. TypeError: can't convert undefined to object - line: 65
   *    // ! 2. props, it's ugly having all these state variables passed in
   */

  const {title, artist, genre, year } = fields


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
    <section className='form-default-fields'>
      <input
        type='text'
        name='title'
        id='title'
        value={title}
        placeholder='Enter Album Title'
        onChange={(e) => onChange(e, 'title')}
      />
      <input
        type='text'
        name='artist'
        id='artist'
        value={artist}
        placeholder='Enter Artist Name'
        onChange={(e) => onChange(e, 'artist')}
      />
      <input
        type='text'
        name='genre'
        id='genre'
        placeholder='Enter Genre'
        value={genre}
        onChange={(e) => onChange(e, 'genre')}
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
