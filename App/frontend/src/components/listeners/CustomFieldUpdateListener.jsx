import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'

import { toast } from 'react-toastify'
import socket from '../../socket'


const CustomFieldUpdateListener = () => {
  const dispatch = useDispatch()
  const { collection } = useSelector((state) => state.collection)


const collectionRef = useRef(collection)
useEffect(() => {
  collectionRef.current = collection
}, [collection])

  useEffect(() => {
    const options = {
      autoClose: 3000, // 3 seconds
      toastId: 'customFieldUpdate',
      closeButton: FaTimes,
      type: toast.TYPE.INFO,
      position: toast.POSITION.TOP_RIGHT,
      pauseOnHover: true,
      draggable: true,
    }


     const handleCustomFieldUpdate = (data) => {
      const { discogId, key, value } = data
      console.log(
        `socket.js received notifyCustomFieldUpdate event with data: ${discogId}, ${key}, ${value}`
      )

      if (!collectionRef.current || collectionRef.current.length === 0) {
        console.log(`collectionRef is empty`)
        return
      }

      const updAlbum = collectionRef.current.find(
        (album) => album.discogsAlbumId === discogId
      )
      console.log(`from CustomFieldUpdateListener, updAlbum: ${updAlbum}`)

      if (updAlbum) {
        toast('hello', options)
      }
    }

    socket.on('notifyCustomFieldUpdate', handleCustomFieldUpdate)

    // add listener
    // const cleanup = addCustomFieldUpdateListener(handleCustomFieldUpdate) 

    // listen for customFieldUpdate events
    // socket.on('customFieldUpdate', handleCustomFieldUpdate)

    return () => {
      // remove listener
      socket.off('notifyCustomFieldUpdate', 'handleCustomFieldUpdate')
    }
  }, [])

  return null
}

export default CustomFieldUpdateListener
