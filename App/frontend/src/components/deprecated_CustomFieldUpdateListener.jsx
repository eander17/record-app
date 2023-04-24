import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import socket from '../socket'
import { updateAlbum } from '../features/collection/collectionSlice'

const CustomFieldUpdateListener = () => {
  const dispatch = useDispatch()
  const collection = useSelector(
    (state) => state.collection.collection
  )

  useEffect(() => {
    // listen for customFieldUpdate events
    socket.on('customFieldUpdate', (data) => {
      console.log(
        `received update for custom field ${data.key} with value ${data.value}`
      )
      console.log(`data.discogsAlbumId: ${data.discogsAlbumId}`)

      console.log(`collection: ${collection}`)
      const albumToUpdate = collection.find(
        (album) => album.discogsAlbumId === data.discogsAlbumId
      )
      console.log(`albumToUpdate: ${albumToUpdate}`)

      if (albumToUpdate) {
        //prompt user to add the custom field to their album
        toast.dark(
          `Another user added a custom field (${data.key}: ${data.value}) to this album. Add it to your album?`,
          {
            autoClose: false,
            draggable: false,
            closeButton: true,
            closeOnClick: false,
            position: 'top-center',
            hideProgressBar: true,
            
            
            
            
            
            
              
            onOpen: () => {
              // when user clicks the "add" button, update the album with the new custom field
              toast.info(
                <button
                  className='toast-btn'
                  onClick={() => {
                    // create a new obj with customKey and customValue
                    const customField = {
                      [data.key]: data.value,
                    }
                    // create a new Map object and add the customField obj to it
                    const updCustomFields = {
                      ...albumToUpdate.customFields,
                      ...customField,
                    }
                    // add the new customField to the album.customFields array
                    const updAlbum = {
                      ...albumToUpdate,
                      customFields: updCustomFields,
                    }
                    // update the album
                    dispatch(updateAlbum(updAlbum))
                  }}
                >
                  Add
                </button>
              )
            },
          }
        )
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [collection, dispatch])
  return null
}

export default CustomFieldUpdateListener
