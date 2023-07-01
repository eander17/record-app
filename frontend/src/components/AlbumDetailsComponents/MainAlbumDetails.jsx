/** @format */

// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types'

function MainAlbumDetails({ album }) {
  const { title, artist, genre, year, image } = album
  return (
    <>
      <div className='hero bg-base-200 min-h-screen'>
        <div className='hero-content flex-col lg:flex-row'>
          <img
            src={image}
            alt={title}
          />
          <div>
            <h1 className='text-5xl font-bold'>{title}</h1>
            <p className='py-6'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              adipisci vero, mollitia similique ducimus ad dicta quis
              repellendus error nostrum recusandae, perferendis ratione ipsa ea
              molestiae quas esse eligendi blanditiis.
            </p>
          </div>
        </div>
      </div>
      <div>
        <table className='border-collapse border'>
          <thead>
            <tr>
              <th className='border'>Album Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border'>Album Title</td>
              <td className='border'>{title}</td>
            </tr>
            <tr>
              <td className='border'>Artist</td>
              <td className='border'>{artist}</td>
            </tr>
            <tr>
              <td className='border'>Genre</td>
              <td className='border'>{genre}</td>
            </tr>
            <tr>
              <td className='border'>Release Year</td>
              <td className='border'>{year}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

// eslint-disable-next-line react/prop-types
function AdditionalFields({ album }) {
  // eslint-disable-next-line react/prop-types
  // td const { runtime, format, style } = album
  console.log(album)
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Additional Fields</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>runtime</td>
            <td>ttt</td>
          </tr>
          <tr>
            <td>format</td>
            <td>ttt</td>
          </tr>
          <tr>
            <td>Sub Genre</td>
            <td>333</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

MainAlbumDetails.propTypes = {
  album: PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
}

export { MainAlbumDetails, AdditionalFields }
