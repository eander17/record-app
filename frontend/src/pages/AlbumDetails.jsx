/** @format */

import PropTypes from 'prop-types'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import useBeforeUnload from '../components/hooks/useBeforeUnload'
import { emptyObject } from '../components/hooks/utilityFunctions'
import { setLocalStorage } from '../components/hooks/utilityHooks'
import {
  getFormattedRuntime,
  getThisMonth,
  getThisYear,
} from '../features/collection/albumService'
import { addListen, updateAlbum } from '../features/collection/albumSlice'

// info: used for local storage, might not need.
//  const KEY = 'albumData'

function AlbumDetails() {
  const dispatch = useDispatch()
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

  /// RETURNS for JSX ///

  // if (loading) return <Spinner />

  if (!emptyObject(album)) {
    return (
      <div className='flex flex-col'>
        <AlbumTitle />
        <StatPane
          listens={album.listens}
          totalTime={totalTime}
          curMonthListens={curMonthListens}
          curYearListens={curYearListens}
          onListen={handleListenClick}
        />
        <ExtendedDetails />
        <TrackListTable />
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
    <div className='hero bg-base-200 py-12 lg:py-24'>
      <div className='hero-content flex-col lg:flex-row'>
        <img
          src={image}
          alt={title}
          className='max-w-sm rounded-lg shadow-2xl'
        />
        <div className='mt-8 flex flex-auto flex-col lg:mx-8 lg:mt-0'>
          <h1 className='text-5xl font-bold'>{title}</h1>
          <div className='flex flex-grow flex-row justify-between py-6'>
            <h3>{artist}</h3>
            <h3>{genre}</h3>
            <h3>{year}</h3>
          </div>
          <div className=' flex-grow flex-row justify-between py-2'>
            <span className='pr-2'>{'Format: '}</span>
            <span>{format.join(', \u00A0 ')}</span>
          </div>{' '}
          <div className='flex-grow flex-row justify-between py-2'>
            <span className='pr-4'>{'Styles: '} </span>
            <span>{styles.join(', \u00A0 ')}</span>
          </div>
          <div className='flex-grow flex-row py-2'>
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
  )
}

function StatPane({
  listens,
  totalTime,
  curMonthListens,
  curYearListens,
  onListen,
}) {
  const totalTimeDate = new Date(totalTime)

  return (
    <div className='flex flex-row items-center justify-around'>
      <div
        className='tooltip tooltip-success'
        data-tip='Listen!'
      >
        <button
          type='button'
          className='btn btn-square hover:text-success mt-1'
          onClick={onListen}
        >
          <FaPlus />
        </button>
      </div>
      <div className='stats shadow'>
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
          <div className='stat-desc text-secondary'>desc</div>
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
}

function ExtendedDetails() {
  // const album = retrieveFromLocalStorage('albumData')

  return <h1 className='py-4'>Extended Details</h1>
}

function TrackListTable() {
  const { album } = useSelector((state) => state.album)
  const { trackList } = album
  return (
    <>
      <h2 className='prose prose-xl '>Track List</h2>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              <th> </th>
              <th>Track Title</th>
              <th>Favorite</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {trackList.map((track) => {
              const { position, title, duration } = track
              return (
                <tr key={track._id}>
                  <td>{position}</td>
                  <td>{title}</td>
                  <td>Favorite?</td>
                  <td>{duration}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
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
