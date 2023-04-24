import { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import socket from '../../socket'
import { setCustomFields } from '../../features/collection/fieldsSlice'

const CustomFieldUpdateListener = () => {
  // const navigate = useContext(NavigationContext) //fuck da (routing) police
  const navigate = useNavigate() 
  const dispatch = useDispatch()
  const { collection } = useSelector((state) => state.collection)

  const collectionRef = useRef(collection)
  useEffect(() => {
    collectionRef.current = collection
  }, [collection])

  /// Function Definition: notify 
  // @param data - userId, customKey, customValue
  const notify = useCallback((data) => {
    const {id, key, value } = data
    const toastId = id
    const toastProps = {
      toastId,
      autoClose: false, // 3 seconds
      closeOnClick: false,
      closeButton: FaTimes,
      type: toast.TYPE.INFO,
      position: toast.POSITION.TOP_RIGHT,
      pauseOnHover: true,
      pauseOnFocusLoss: true,
      draggable: true,
      onClose: () => {
        console.log('CLOSE THAT TOAST')
      },
      onOpen: () => {
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
  }, [dispatch, navigate])

  useEffect(() => {
    const handleCustomFieldUpdate = (data) => {
      const { discogId, key, value } = data
      console.log(
        `socket.js received notifyCustomFieldUpdate event with data: ${discogId}, ${key}, ${value}`
      )

      if (
        !collectionRef.current ||
        collectionRef.current.length === 0
      ) {
        console.log(`collectionRef is empty`)
        return
      }

      const updAlbum = collectionRef.current.find(
        (album) => album.discogsAlbumId === discogId
      )
      console.log(
        `from CustomFieldUpdateListener, updAlbum: ${updAlbum}`
      )

      updAlbum && notify({ id: updAlbum._id, key, value })    
    }

    socket.on('notifyCustomFieldUpdate', handleCustomFieldUpdate)

    return () => {
      // remove listener
      socket.off('notifyCustomFieldUpdate', 'handleCustomFieldUpdate')
    }
  }, [dispatch, navigate, notify])

  return null
}

export default CustomFieldUpdateListener
