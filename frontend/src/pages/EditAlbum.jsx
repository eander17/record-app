import { useState } from 'react'
import { FaSave, FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getFormattedRuntime } from '../features/collection/albumService'
import { setAlbum, updateAlbum } from '../features/collection/albumSlice'

function EditAlbum() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { album } = useSelector((state) => state.album)

  const [data, setData] = useState({
    ...album, // spread in the album data
    title: album.title,
    artist: album.artist,
    genre: album.genre,
    year: album.year,
    image: album.image,
    format: album.format,
    styles: album.styles,
    runtime: album.runtime,
    trackList: album.trackList,
  })

  const { hours, minutes, seconds } = getFormattedRuntime(data.runtime)
  const displayRuntime = `${hours}:${minutes}:${seconds}`

  const handleSave = () => {
    console.log('save')
    if (emptyFields()) {
      toast.error('Cannot submit empty fields')
      return
    }
    dispatch(setAlbum({ ...album, ...data }))
    dispatch(updateAlbum())
    const urlTitle = data.title.replace(/\s+/g, '-').toLowerCase()
    navigate(`/albums/${urlTitle}`)
  }

  const emptyFields = () =>
    Object.values(data).some((value) => value === '' || value === null)

  const handleCancel = () => {
    console.log('cancel')
    const urlTitle = data.title.replace(/\s+/g, '-').toLowerCase()
    navigate(`/albums/${urlTitle}`)
  }

  const handleChange = (e, key) => {
    const { value } = e.target
    setData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleTrackChange = (e, id, key) => {
    const { value } = e.target
    setData((prev) => ({
      ...prev,
      trackList: prev.trackList.map((track) => {
        if (track._id === id) {
          return {
            ...track,
            [key]: value,
          }
        }
        return track
      }),
    }))
  }

  return (
    <>
      <div className='hero  py-12 lg:py-24'>
        <div className='hero-content flex-col lg:mr-48 lg:flex-row'>
          <img
            src={data.image}
            alt={data.title}
            className='mr-24 max-w-sm rounded-lg shadow-2xl'
          />
          <div className='mt-8 flex flex-auto flex-col text-center lg:mx-8 lg:mt-0'>
            <h1 className='text-center text-5xl font-bold'>{data.title}</h1>
            <div className='my-6 py-6'>
              <div className='flex-grow flex-row px-4 py-2'>
                <span className='pr-4'>{'Runtime: '}</span>
                <span>
                  {data.runtime === 0
                    ? 'no runtime set for this album'
                    : `${displayRuntime}`}
                </span>
              </div>
            </div>
            <div className='flex flex-row justify-center'>
              <button
                type='button'
                className='btn btn-ghost text-info btn-square hover:bg-info-light mx-8 text-3xl'
              >
                <FaSave onClick={handleSave} />
              </button>
              <button
                type='button'
                className='btn btn-ghost text-error btn-square hover:bg-error-content mx-8 text-3xl'
              >
                <FaTimes onClick={handleCancel} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-12 flex flex-col px-12 lg:px-24'>
        <h2 className='prose prose-xl text-primary-content my-12'>
          Album Details
        </h2>
        <div>
          <table className='table-lg text-secondary-content'>
            <thead>{/* <td>Album Details</td> */}</thead>
            <tbody>
              <tr>
                <td>Album Title</td>
                <td>
                  {' '}
                  <input
                    type='text'
                    placeholder='Album Title'
                    value={data.title}
                    className='input input-ghost input-edit w-full max-w-xs border-none '
                    onChange={(e) => handleChange(e, 'title')}
                  />
                </td>
              </tr>
              <tr>
                <td>Artist</td>
                <td>
                  <input
                    type='text'
                    placeholder='Artist'
                    value={data.artist}
                    className='input input-ghost input-edit w-full max-w-xs border-none'
                    onChange={(e) => handleChange(e, 'artist')}
                  />
                </td>
              </tr>
              <tr>
                <td>Release Year</td>
                <td>
                  <input
                    type='text'
                    placeholder='Release Year'
                    value={data.releaseYear}
                    className='input input-ghost input-edit w-full max-w-xs border-none'
                    onChange={(e) => handleChange(e, 'releaseYear')}
                  />
                </td>
              </tr>
              <tr>
                <td>Genres</td>
                <td>
                  <input
                    type='text'
                    placeholder='Genres'
                    value={data.genres}
                    className='input input-ghost input-edit w-full max-w-xs border-none'
                    onChange={(e) => handleChange(e, 'genres')}
                  />
                </td>
              </tr>
              <tr>
                <td>Format</td>
                <td>
                  <input
                    type='text'
                    placeholder='Format'
                    value={data.format}
                    className='input input-ghost input-edit w-full max-w-xs border-none'
                    onChange={(e) => handleChange(e, 'format')}
                  />
                </td>
              </tr>
              <tr>
                <td>Styles</td>
                <td>
                  <input
                    type='text'
                    placeholder='Styles'
                    value={data.styles}
                    className='input input-ghost input-edit w-full max-w-xs border-none'
                    onChange={(e) => handleChange(e, 'styles')}
                  />
                </td>
              </tr>

              <tr />
            </tbody>
          </table>
        </div>
      </div>
      <div className='mb-24 mt-24 flex flex-col px-12 lg:px-24'>
        <h2 className='prose prose-xl text-primary-content my-12'>
          Track List
        </h2>
        <div>
          <table className='text-secondary-content table'>
            <thead>
              <tr className=''>
                <th>Position</th>
                <th>Track Title</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {data.trackList.map((track) => {
                const { position, title, duration } = track
                return (
                  <tr key={track._id}>
                    <td>
                      <input
                        type='text'
                        placeholder='Position'
                        value={position}
                        onChange={(e) =>
                          handleTrackChange(e, track._id, 'position')
                        }
                        className='input input-ghost input-edit w-full max-w-xs border-none'
                      />
                    </td>
                    <td>
                      <input
                        type='text'
                        placeholder='Title'
                        value={title}
                        onChange={(e) =>
                          handleTrackChange(e, track._id, 'title')
                        }
                        className='input input-ghost input-edit w-full max-w-xs border-none'
                      />
                    </td>
                    <td>
                      <input
                        type='text'
                        placeholder='Duration'
                        value={duration}
                        onChange={(e) =>
                          handleTrackChange(e, track._id, 'duration')
                        }
                        className='input input-ghost input-edit w-full max-w-xs border-none'
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default EditAlbum
