/** @format */

import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import {
  clearAllLocalStorage,
  emptyObject,
  retrieveFromLocalStorage,
  setLocalStorage,
} from '../components/hooks/utilityHooks'
import {
  getHoursMinSec,
  getMinSec,
  getThisMonth,
  getThisMonthAndYearListens,
  getThisYear,
} from '../features/collection/albumService'
import { resetAlbum, setAlbum } from '../features/collection/albumSlice'
import {
  deleteAlbum,
  updateAlbum,
} from '../features/collection/collectionSlice'

// todo - getListens import currently only used for testing, remove when done
// todo - build stats panel: add listen, num listens, favorite btn, date added
// todo - get album to update to database
// todo - correct loading so that listens are accurate
// todo - add edit and delete buttons
// todo - build form to edit album details

// fix - album is lost to state when user refreshes page

const KEY = 'albumData'

function AlbumDetails() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { album } = useSelector((state) => state.album)

  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log('page unloading, calling dispatch updateAlbum')
      setLocalStorage(KEY, album)
      dispatch(updateAlbum(album))
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    console.log(
      `album updated in AlbumData useEffect: ${JSON.stringify(album)}`,
    )
  }, [album])

  useEffect(() => {
    if (!user) {
      toast.error('You must be logged in to view this page')
      clearAllLocalStorage()
      dispatch(resetAlbum())
      navigate('/login')
    }

    // if (emptyObject(album)) dispatch(setAlbum(retrieveFromLocalStorage(KEY)))

    return () => {
      console.log(`dispatching updateAlbum- album: ${JSON.stringify(album)}`)
      dispatch(updateAlbum(album))
    }
  }, [user, dispatch, navigate])

  /// handleAddCustomField: toggles the add custom field form
  // eslint-disable-next-line no-unused-vars
  const handleAddCustomField = () => {
    console.log('Clicked Add Custom Field')
  }

  /// handleDelete: deletes album from user's collection
  // eslint-disable-next-line no-unused-vars
  const handleDelete = (itemId) => {
    dispatch(deleteAlbum(itemId)) // id === album's id
    dispatch(resetAlbum())
    navigate('/')
  }

  // eslint-disable-next-line no-unused-vars
  const handleSave = () => {
    const customFieldsObject = customData.reduce(
      (obj, field) => ({ ...obj, [field.key]: field.value }),
      {},
    )
    const updatedAlbum = {
      ...album,
      ...data,
      customFields: customFieldsObject,
    }

    dispatch(updateAlbum(updatedAlbum))
    setShowEditField(false)
  }

  if (emptyObject(album)) return <Spinner />

  return (
    <div className='flex flex-col'>
      <AlbumTitle />
      <StatPane />
      <ExtendedDetails />
      <TrackListTable />
    </div>
  )
}

function AlbumTitle() {
  const dispatch = useDispatch()

  const { album } = useSelector((state) => state.album)

  checkStorageForAlbum(album, dispatch)

  const { title, artist, genre, year, image, format, styles, runtime } = album

  const { minutes, seconds } = getMinSec(runtime)

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
            <span>{`${minutes}:${seconds}`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatPane() {
  const dispatch = useDispatch()

  const { album, totalListens, totalTime, hasListens } = useSelector(
    (state) => state.album,
  )

  // ? renaming hours minutes seconds to correspond with measure of time.
  const {
    hours: totalHours,
    minutes: totalMin,
    seconds: totalSec,
  } = getHoursMinSec(totalTime)

  const [curMonthListens, setCurMonthListens] = useState(
    () => getThisMonth(album.listens) || 0,
  )
  const [curYearListens, setCurYearListens] = useState(
    () => getThisYear(album.listens) || 0,
  )

  function updateListens(listens) {
    const { thisMonthListens, thisYearListens } =
      getThisMonthAndYearListens(listens) || 0
    setCurMonthListens(thisMonthListens)
    setCurYearListens(thisYearListens)
  }

  const handleListenClick = () => {
    // album update logic. adding new listen to listens array
    const updatedListens = [...album.listens, Date.now()]
    const updatedAlbum = { ...album, listens: updatedListens }
    console.log(
      `adding new listen - updatedAlbum: ${JSON.stringify(updatedAlbum)}`,
    )
    updateListens(updatedListens)
    dispatch(setAlbum(updatedAlbum))
  }

  return (
    <div className='flex flex-row items-center justify-around'>
      <div
        className='tooltip tooltip-success'
        data-tip='Listen!'
      >
        <button
          type='button'
          className='btn btn-square hover:text-success mt-1'
          onClick={handleListenClick}
        >
          <FaPlus />
        </button>
      </div>
      <div className='stats shadow'>
        <div className='stat place-items-center'>
          <div className='stat-title'>Total Listens</div>
          <div className='stat-value'>{totalListens}</div>
          <div className='stat-desc'>
            {hasListens
              ? `${totalHours} hours ${totalMin} minutes ${totalSec} seconds`
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

function ExtendedDetails() {
  // const album = retrieveFromLocalStorage('albumData')

  return <h1 className='py-4'>Extended Details</h1>
}

function TrackListTable() {
  const album = retrieveFromLocalStorage(KEY)
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

function checkStorageForAlbum(album, dispatch) {
  if (emptyObject(album)) {
    const stored = retrieveFromLocalStorage(KEY)
    dispatch(setAlbum(stored))
  }
}

export default AlbumDetails

// eslint-disable-next-line no-unused-vars
// const handleCancelEdit = () => {
//   rebuildCustomFields()
//   setShowEditFields(false)
// }

// // eslint-disable-next-line no-unused-vars
// const handleDefaultsChange = (e, key) => {
//   const { value } = e.target
//   // update albumData state with new value
//   setData((prev) => ({
//     ...prev,
//     [key]: value,
//   }))
// }

// // eslint-disable-next-line no-unused-vars
// const handleCustomChange = (e, index) => {
//   const { name, value } = e.target
//   setCustomData((prev) =>
//     prev.map((field, i) =>
//       i === index ? { ...field, [name]: value } : field,
//     ),
//   )
// }

// const rebuildCustomFields = () => {
//   if (anyCustomFields) {
//     const customFieldsArray = Object.entries(album.customFields).map(
//       ([key, value]) => ({ key, value }),
//     )
//     setCustomData(customFieldsArray)
//   }
// }

// only allow numbers to be entered into year field
// this might be problematic.
// eslint-disable-next-line no-unused-vars
// const handleYearChange = (e) => {
//   const { value } = e.target
//   const yearRegex = /^[0-9\b]+$/

//   if (value === '' || yearRegex.test(value)) {
//     // onChange(e, 'year')
//     console.log('year changed')
//   }
// }
