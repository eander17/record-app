import { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import socket from '../../socket'
import { setCustomFields } from '../../features/custFields/fieldSlice'

const CustomFieldUpdateListener = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { collection } = useSelector((state) => state.collection)

  // useRef to store the collection object in a mutable variable
  const collectionRef = useRef(collection)
  useEffect(() => {
    collectionRef.current = collection
  }, [collection])

  /// Function Definition: notify
    // @param : userId === id
    // @param : customKey === key
    // @param :  customValue === value
  const notify = useCallback(
    (data) => {
      const { id, key, value } = data
      const toastId = id
      const toastProps = {
        toastId,
        autoClose: false, // ! change this
        closeOnClick: false, // ! Change This
        closeButton: FaTimes,
        type: toast.TYPE.INFO,
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        draggable: true,
        onClose: () => {
          // TODO: Implement close logic
          console.log('CLOSE THAT TOAST')
        },
        onOpen: () => {
          // TODO: Implement open logic
          console.log(`POP THAT TOAST ${toastId}`)
        },
        onClick: () => {
          console.log('CLICK THAT TOAST')
          console.log(`confirm is true`)
          dispatch(
            setCustomFields({ customKey: key, customValue: value })
          )
          if (navigate) {
            console.log(`navigate is true`)
            navigate(`/edit/${id}`)
          }
        },
      }
      toast(`toast`, toastProps)
    },
    [dispatch, navigate]
  )

  /// useEffect: 
  useEffect(() => {
    // ? handleCustomFieldUpdate: 
      // handles socket logic for custom field updates, controls toast notifications
    const handleCustomFieldUpdate = (data) => {
      const { discogId, key, value } = data
      console.log(
        `socket.js received notifyCustomFieldUpdate event with data: ${discogId}, ${key}, ${value}`
      )

      // if collection ref doesnt exist or is empty, return
      if (
        !collectionRef.current ||
        collectionRef.current.length === 0
      ) {
        console.log(`collectionRef is empty`)
        return
      }

      // find currentUser album in collectionRef
      const currUserAlbum = collectionRef.current.find(
        (album) => album.discogsAlbumId === discogId
      )
      console.log(
        `from CustomFieldUpdateListener, updAlbum: ${currUserAlbum}`
      )

      // calls notify function ONLY if current user's album exists
      currUserAlbum && notify({ id: currUserAlbum._id, key, value })
    }

    socket.on('notifyCustomFieldUpdate', handleCustomFieldUpdate)

    // cleanup function
    return () => {
      // remove listener
      socket.off('notifyCustomFieldUpdate', 'handleCustomFieldUpdate')
    }
  }, [dispatch, navigate, notify])

  return null // component does not render anything, so return null
}

export default CustomFieldUpdateListener
