/** @format */

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  getAlbumById,
  reset,
  deleteAlbum,
  updateAlbum,
} from '../features/collection/collectionSlice'

function AlbumDetails() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { id } = useParams() //! need to do because store doesn't have album yet.
  const { user } = useSelector((state) => state.auth)
  const { album, isError, message } = useSelector(
    (state) => state.collection
  )

  const { title, artist, genre, year, image, customFields, _id } =
    album
  // set to true if album has customFields
  const [anyCustomFields, setAnyCustomFields] = useState(false)

  // ? BOOL: state variables to control form visibility
  const [showEditFields, setShowEditFields] = useState(false)
  const [data, setData] = useState({
    title: '',
    artist: '',
    genre: '',
    year: '',
  })

  const [customData, setCustomData] = useState([])

  useEffect(() => {
    if (album) {
      setData((prevData) => ({
        ...prevData,
        title: album.title,
        artist: album.artist,
        genre: album.genre,
        year: album.year,
      }))

      // if album has custom fields, set state to true
      setAnyCustomFields(
        album.customFields &&
          Object.values(album.customFields).length > 0
      )

      // if AnyCustomFields is true, set customData state
      rebuildCustomFields()
    }
    return () => {
      // cleanup
    }
  }, [album, anyCustomFields])

  console.log(customData)
  /// handleAddCustomField: toggles the add custom field form
  const handleAddCustomField = () => {
    console.log('Clicked Add Custom Field')
  }

  /// handleDelete: deletes album from user's collection
  const handleDelete = () => {
    dispatch(deleteAlbum(_id)) // id === album's id
    navigate('/')
  }

  const handleSave = () => {
    const customFieldsObject = customData.reduce(
      (obj, field) => ({ ...obj, [field.key]: field.value }),
      {}
    )
    const updatedAlbum = {
      ...album,
      ...data,
      customFields: customFieldsObject,
    }

    dispatch(updateAlbum(updatedAlbum))
    setShowEditFields(false)
  }

  const handleCancelEdit = () => {
    rebuildCustomFields()
    setShowEditFields(false)
  }

  const handleDefaultsChange = (e, key) => {
    const { value } = e.target
    // update albumData state with new value
    setData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleCustomChange = (e, index) => {
    const { name, value } = e.target
    setCustomData((prev) =>
      prev.map((field, i) =>
        i === index ? { ...field, [name]: value } : field
      )
    )
  }

  const rebuildCustomFields = () => {
    if (anyCustomFields) {
      const customFieldsArray = Object.entries(
        album.customFields
      ).map(([key, value]) => ({ key, value }))
      setCustomData(customFieldsArray)
    }
  }

  // only allow numbers to be entered into year field
  // this might be problematic.
  const handleYearChange = (e) => {
    const { value } = e.target
    const yearRegex = /^[0-9\b]+$/

    if (value === '' || yearRegex.test(value)) {
      onChange(e, 'year')
    }
  }

  useEffect(() => {
    if (isError) {
      console.error(message)
    }
    // if user is not logged in, redirect to login page
    if (!user) {
      navigate('/login')
    } else {
      dispatch(getAlbumById(id))
    }

    // dispatches reset for collectionSlice
    return () => {
      dispatch(reset())
    }
  }, [dispatch, id, navigate, user, isError, message])

  // ? if album is null, returns album not found.
  if (!album) {
    return <h1>Album not found</h1>
  }

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
    </>
  )

  if (!showEditFields) {
    return (
      <div className='mx-8 mt-4 md:mx-48 md:mt-24'>
        <div className='card card-side card-compact max-h-fit max-w-fit bg-primary shadow-xl'>
          <div className='card-body max-w-fit  flex-row'>
            <div className='flex flex-col justify-start'>
              <figure className='max-h-lg max-w-fit shrink-0 grow'>
                <img
                  src={image}
                  alt={title}
                  className='object-content'
                />
              </figure>
              <div className='flex flex-col'>
                <h2 className='card-title prose text-primary-content '>
                  {title}
                </h2>
                <p className='text-primary-content'>{artist}</p>
                <p className='text-primary-content'>{genre}</p>
                <p className='text-primary-content'>{year}</p>
                <p className='text-primary-content'>
                  Date Added:
                  {new Date(album.createdAt).toLocaleDateString(
                    'en-US'
                  )}
                </p>
              </div>
            </div>
            <div className='flex flex-col justify-between'>
              {anyCustomFields && (
                <div className='flex flex-col'>
                  <table className='table'>
                    <thead className='items-center'>
                      <tr className='prose text-center text-accent'>
                        <th>Custom Fields</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customData.map((field, index) => {
                        return (
                          <tr
                            key={index}
                            className='prose text-primary-content hover:bg-primary'
                          >
                            <th>{field.key}</th>
                            <td>{field.value}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              <div className='card-actions place-items-end items-end justify-end'>
                <button
                  className='btn '
                  onClick={() => setShowEditFields(true)}
                >
                  edit album
                </button>
                <button
                  className='btn-error btn'
                  onClick={handleDelete}
                >
                  delete album
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showEditFields) {
    return (
      <div className='mx-8 mt-4 flex-none md:mx-48 md:mt-24  '>
        <div className='card-compact card card-side max-h-fit min-w-fit max-w-fit items-start bg-primary shadow-xl'>
          <figure className='max-h-lg max-w-fit shrink-0 grow '>
            <img
              src={image}
              alt={title}
              className=' object-content'
            />
          </figure>
          <div className='card-body  max-w-fit flex-row items-start'>
            <table className='prose table text-primary-content'>
              <tbody>
                <tr className='text-primary-content'>
                  <th>Album Title</th>
                  <td>
                    <input
                      required
                      onChange={(e) =>
                        handleDefaultsChange(e, 'title')
                      }
                      type='text'
                      value={data.title}
                      placeholder='Album Title'
                      className='input-ghost input w-full'
                    />
                  </td>
                </tr>
                <tr className='text-primary-content'>
                  <th>Artist</th>
                  <td>
                    <input
                      required
                      onChange={(e) =>
                        handleDefaultsChange(e, 'artist')
                      }
                      type='text'
                      value={data.artist}
                      placeholder='artist'
                      className='input-ghost input w-full'
                    />
                  </td>
                </tr>
                <tr className=' text-primary-content'>
                  <th>Genre</th>
                  <td>
                    <input
                      required
                      onChange={(e) =>
                        handleDefaultsChange(e, 'genre')
                      }
                      type='text'
                      value={data.genre}
                      placeholder='genre'
                      className='input-ghost input w-full'
                    />
                  </td>
                </tr>
                <tr className='text-primary-content'>
                  <th>Release Year</th>
                  <td>
                    <input
                      required
                      onChange={(e) => handleYearChange(e)}
                      type='text'
                      value={data.year}
                      placeholder='Enter Year'
                      className='input-ghost input w-full'
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {anyCustomFields && (
              <div className='mt-4 grow'>
                <h4 className='card-title prose ml-6 font-bold text-primary-content'>
                  Custom Fields:
                </h4>
                <table className='prose table text-primary-content'>
                  <tbody>
                    {customData.map((field, index) => {
                      return (
                        <tr
                          key={index}
                          className='text-primary-content'
                        >
                          <th>
                            <input
                              type='text'
                              name='key'
                              value={field.key}
                              placeholder='Edit Key'
                              className='input-ghost input w-full'
                              onChange={(e) =>
                                handleCustomChange(e, index)
                              }
                            />
                          </th>
                          <td>
                            <input
                              type='text'
                              name='value'
                              value={field.value}
                              placeholder='Edit Value'
                              className='input-ghost input w-full'
                              onChange={(e) =>
                                handleCustomChange(e, index)
                              }
                            />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
            <div className='card-actions ml-1 self-end'>
              <button
                className='btn '
                onClick={handleSave}
              >
                Save Changes
              </button>
              <button
                className='btn-secondary btn px-10 hover:bg-fa-delete hover:text-black'
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AlbumDetails
