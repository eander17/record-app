/** @format */

export const MainAlbumDetails = ({ album }) => {
  const { title, artist, genre, year, image } = album
  return (
    <>
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content flex-col lg:flex-row'>
          <img
            src={image}
            alt={title}
          />
          <div>
            <h1 className='text-5xl font-bold'>{title}</h1>
            <p className='py-6'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo adipisci vero, mollitia similique ducimus ad
              dicta quis repellendus error nostrum recusandae,
              perferendis ratione ipsa ea molestiae quas esse eligendi
              blanditiis.
            </p>
          </div>
        </div>
      </div>
      <div>
        <table className='border-collapse border'>
          <thead></thead>
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

export const AdditionalFields = ({ album }) => {
  const { runtime, format, style } = album
  return (
    <>
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
              <td></td>
            </tr>
            <tr>
              <td>format</td>
              <td></td>
            </tr>
            <tr>
              <td>Sub Genre</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
