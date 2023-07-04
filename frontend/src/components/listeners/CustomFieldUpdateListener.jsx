/** @format */

import { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import socket from '../../socket'
import { setCustomFields } from '../../features/custFields/fieldSlice'

const closeButton = ({ closeToast, onClick }) => {
  const handleClick = async (e) => {
    e.stopPropagation()
    if (onClick) await onClick()
    closeToast()
  }
  return (
    <button
      type='button'
      className='fa close del-toast'
      onClick={(e) => handleClick(e)}
    >
      <FaTimes />
    </button>
  )
}

function CustomFieldUpdateListener() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { collection } = useSelector((state) => state.collection)

  const handleToastClick = useCallback(
    (data) => {
      const { id, key, value } = data
      console.log('CLICK THAT TOAST')
      if (key && value) {
        dispatch(setCustomFields({ customKey: key, customValue: value }))
      }
      if (navigate && id) {
        console.log('navigate is true')
        navigate(`/edit/${id}`)
      }
    },
    [dispatch, navigate],
  )

  const toastProps = useRef({
    closeOnClick: true,
    icon: false,
    closeButton,
    type: toast.TYPE.INFO,
    position: toast.POSITION.TOP_RIGHT,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    draggable: true,
    onClick: handleToastClick,
    onClose: () => {
      console.log('CLOSE THAT TOAST')
    },
    onOpen: () => {
      console.log('POP THAT TOAST')
    },
  })

  /// Function Definition: notify
  // @param : userId === id
  // @param : customKey === key
  // @param :  customValue === value
  const notify = useCallback(
    (data) => {
      const { id, title, artist, key, value } = data
      const toastId = id
      const message = `New custom field

      Add ${key}: ${value} to
      ${title} by
      ${artist}?`

      toast(message, {
        ...toastProps.current,
        toastId,
        onRender: (node) => {
          // eslint-disable-next-line no-param-reassign
          node.querySelector('.Toastify__toast-body').innerHTML = message
        },
        onClick: () => handleToastClick({ id, key, value }),
      })
    },
    [handleToastClick, toastProps],
  )

  /// useEffect:
  useEffect(() => {
    // ? handleCustomFieldUpdate:
    // handles socket logic for custom field updates, controls toast notifications
    const handleCustomFieldUpdate = (data) => {
      const { discogId, key, value } = data
      console.log(
        `socket.js received notifyCustomFieldUpdate event with data: ${discogId}, ${key}, ${value}`,
      )

      // if collection ref doesnt exist or is empty, return
      if (!collection || collection.length === 0) {
        console.log('collection is empty')
        return
      }

      // find currentUser album in collectionRef
      const currUserAlbum = collection.find(
        (album) => album.discogsAlbumId === discogId,
      )

      // calls notify function ONLY if current user's album exists
      // eslint-disable-next-line no-unused-expressions
      currUserAlbum &&
        notify({
          id: currUserAlbum._id,
          title: currUserAlbum.title,
          artist: currUserAlbum.artist,
          key,
          value,
        })
    }

    socket.on('notifyCustomFieldUpdate', handleCustomFieldUpdate)

    // cleanup function
    return () => {
      // remove listener
      socket.off('notifyCustomFieldUpdate', 'handleCustomFieldUpdate')
    }
  }, [collection, notify])

  return null // component does not render anything, so return null
}

export default CustomFieldUpdateListener
