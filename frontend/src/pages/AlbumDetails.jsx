/** @format */

import PropTypes from 'prop-types'
import { useState } from 'react'
import { FaEdit, FaHeart, FaPlus, FaRegHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useBeforeUnload from '../components/hooks/useBeforeUnload'
import { emptyObject } from '../components/hooks/utilityFunctions'
import { setLocalStorage } from '../components/hooks/utilityHooks'
import {
  getFormattedRuntime,
  getThisMonth,
  getThisYear,
} from '../features/collection/albumService'
import {
  addFavoriteTrack,
  addListen,
  updateAlbum,
} from '../features/collection/albumSlice'

// info: used for local storage, might not need.
//  const KEY = 'albumData'

function AlbumDetails() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const location = useLocation()

  const { album, totalTime } = useSelector((state) => state.album)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  useBeforeUnload(() => {
    setLocalStorage('albumData', album)
    if (hasUnsavedChanges) {
      dispatch(updateAlbum(album))
      console.log('callback triggered, leaving page')
    }
    setHasUnsavedChanges(false)
  })

  const [curMonthListens, setCurMonthListens] = useState(
    () => getThisMonth(album.listens) || 0,
  )
  const [curYearListens, setCurYearListens] = useState(
    () => getThisYear(album.listens) || 0,
  )

  function updateListens() {
    setCurMonthListens((prev) => prev + 1)
    setCurYearListens((prev) => prev + 1)
  }

  const handleListenClick = () => {
    // album update logic. adding new listen to listens array
    console.log(`handleListenClick adding new listen`)
    setHasUnsavedChanges(true)
    updateListens()
    dispatch(addListen())
  }

  const handleEditClick = () => {
    navigate(`/albums/edit/${album._id}`)
    console.log(`handleEditClick editing album: ${album.title}`)
  }

  const handleFavorite = (track) => {
    console.log(`handleFavorite adding new favorite track: ${track.title}`)
    setHasUnsavedChanges(true)
    dispatch(addFavoriteTrack(track._id))
  }

  /// RETURNS for JSX ///

  // if (loading) return <Spinner />

  if (!emptyObject(album)) {
    return (
      <div className='bg-base-200 flex flex-col'>
        <AlbumTitle />
        <div className='bg-neutral-focus mx-12 pb-4'>
          <StatPane
            listens={album.listens}
            totalTime={totalTime}
            curMonthListens={curMonthListens}
            curYearListens={curYearListens}
            onListen={handleListenClick}
            onEdit={handleEditClick}
          />
          <ExtendedDetails />
          <TrackListTable onFavorite={handleFavorite} />
        </div>
        <div className='bg-base-200 py-24' />
      </div>
    )
  }
}

function AlbumTitle() {
  const { album } = useSelector((state) => state.album)

  const { title, artist, genre, year, image, format, styles, runtime } = album

  const { hours, minutes, seconds } = getFormattedRuntime(runtime)

  const displayRuntime = `${hours}:${minutes}:${seconds}`

  if (hours === 0) displayRuntime.slice(3) // remove leading 0 if hours === 0

  return (
    <div className='hero  py-12 lg:py-24'>
      <div className='hero-content flex-col lg:flex-row'>
        <img
          src={image}
          alt={title}
          className='max-w-sm rounded-lg shadow-2xl'
        />
        <div className='mt-8 flex flex-auto flex-col lg:mx-8 lg:mt-0 '>
          <h1 className='text-center text-5xl font-bold'>{title}</h1>
          <div className='my-6 py-6'>
            <div className='flex flex-grow flex-row justify-between px-4'>
              <h3>{artist}</h3>
              <h3>{genre}</h3>
              <h3>{year}</h3>
            </div>
            <div className=' flex-grow flex-row justify-between px-4 py-2'>
              <span className='pr-2'>{'Format: '}</span>
              <span>{format.join(', \u00A0 ')}</span>
            </div>{' '}
            <div className='flex-grow flex-row justify-between px-4 py-2'>
              <span className='pr-4'>{'Styles: '} </span>
              <span>{styles.join(', \u00A0 ')}</span>
            </div>
            <div className='flex-grow flex-row px-4 py-2'>
              <span className='pr-4'>{'Runtime: '}</span>
              <span>
                {runtime === 0
                  ? 'no runtime set for this album'
                  : `${displayRuntime}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatPane({
  listens,
  totalTime,
  curMonthListens,
  curYearListens,
  onListen,
  onEdit,
}) {
  const totalTimeDate = new Date(totalTime)

  return (
    <div className='bg-neutral flex flex-row items-center justify-around py-6'>
      <div
        className='tooltip tooltip-success'
        data-tip='Edit Album'
      >
        <button
          type='button'
          className='btn btn-primary btn-square hover:text-success mt-1'
          onClick={onEdit}
        >
          <FaEdit />
        </button>
      </div>
      <div
        className='tooltip tooltip-success'
        data-tip='Listen!'
      >
        <button
          type='button'
          className='btn btn-primary btn-square hover:text-success mt-1'
          onClick={onListen}
        >
          <FaPlus />
        </button>
      </div>
      <div className='stats bg-neutral shadow'>
        <div className='stat place-items-center'>
          <div className='stat-title'>Total Listens</div>
          <div className='stat-value'>{listens.length || 0}</div>
          <div className='stat-desc'>
            {listens > 0
              ? `${totalTimeDate.getHours()} hours
              ${totalTimeDate.getMinutes()} minutes
              ${totalTimeDate.getSeconds()} seconds`
              : null}
          </div>
        </div>
        <div className='stat place-items-center'>
          <div className='stat-title'>Listens this Year</div>
          <div className='stat-value text-secondary'>{curYearListens}</div>
          <div className='stat-desc text-secondary'>{}</div>
        </div>
        <div className='stat place-items-center'>
          <div className='stat-title'>Listens This Month</div>
          <div className='stat-value text-secondary'>{curMonthListens}</div>
          <div className='stat-desc text-secondary'>{}</div>
        </div>
      </div>
    </div>
  )
}

StatPane.propTypes = {
  listens: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalTime: PropTypes.number.isRequired,
  curMonthListens: PropTypes.number.isRequired,
  curYearListens: PropTypes.number.isRequired,
  onListen: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

function ExtendedDetails() {
  // const album = retrieveFromLocalStorage('albumData')

  return <h1 className='py-4 pl-8'>Extended Details</h1>
}

// TODO: add heart icon for favorite and allow onclick to toggle
function TrackListTable({ onFavorite }) {
  const { album } = useSelector((state) => state.album)
  const { trackList } = album
  return (
    <>
      <h2 className='prose prose-xl pl-8'>Track List</h2>
      <div className='px-8'>
        <table className='table'>
          <thead>
            <tr className=''>
              <th>Position</th>
              <th>Track Title</th>
              <th>Favorite</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {trackList.map((track) => {
              const { position, title, duration, favorite } = track
              return (
                <tr key={track._id}>
                  <td>{position}</td>
                  <td>{title}</td>
                  <td>
                    {favorite ? (
                      <FaHeart onClick={() => onFavorite(track)} />
                    ) : (
                      <FaRegHeart onClick={() => onFavorite(track)} />
                    )}
                  </td>
                  <td>
                    <div className='ml-4'>{duration}</div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

TrackListTable.propTypes = {
  onFavorite: PropTypes.func.isRequired,
}

// function checkStorageForAlbum(album, dispatch) {
//   if (emptyObject(album)) {
//     const stored = retrieveFromLocalStorage(KEY)
//     dispatch(setAlbum(stored))
//   }
// }

export default AlbumDetails

// /// handleAddCustomField: toggles the add custom field form
// // eslint-disable-next-line no-unused-vars
// const handleAddCustomField = () => {
//   console.log('Clicked Add Custom Field')
// }

// /// handleDelete: deletes album from user's collection
// // eslint-disable-next-line no-unused-vars
// const handleDelete = (itemId) => {
//   dispatch(deleteAlbum(itemId)) // id === album's id
//   dispatch(resetAlbum())
//   navigate('/')
// }

// // eslint-disable-next-line no-unused-vars
// const handleSave = () => {
//   const customFieldsObject = customData.reduce(
//     (obj, field) => ({ ...obj, [field.key]: field.value }),
//     {},
//   )
//   const updatedAlbum = {
//     ...album,
//     ...data,
//     customFields: customFieldsObject,
//   }

//   dispatch(updateAlbum(updatedAlbum))
//   setShowEditField(false)
// }
