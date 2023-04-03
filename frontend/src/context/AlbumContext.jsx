import { createContext, useState, useEffect } from 'react'

const AlbumContext = createContext()

export const AlbumProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [album, setAlbum] = useState([])

  const [albumEdit, setAlbumEdit] = useState({
    item: {}, // album
    edit: false,
  })

  useEffect(() => {
    fetchAlbumCollection()
  }, [])

  // fetch album
  const fetchAlbumCollection = async () => {
    //const res = await fetch('/album_collection?_sort=id&_order=desc')
    const res = await fetch('/album_collection?_sort=id&_order=desc')
    const data = await res.json()

    setAlbum(data)
    setIsLoading(false)
  }

  // add a new album
  const addAlbum = async (newAlbum) => {
    const res = await fetch('/album_collection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAlbum),
    })

    const data = await res.json()

    setAlbum([data, ...album])
  }

  // delete an album
  const deleteAlbum = async (id) => {
    if (window.confirm('Are you sure you want to delete this album?')) {
      await fetch(`/album_collection/${id}`, {
        method: 'DELETE',
      })

      setAlbum(album.filter((item) => item.id !== id))
    }
  }

  // update an album
  const updateAlbum = async (id, updItem) => {
    const res = await fetch(`/album_collection/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    })

    const data = await res.json()

    setAlbum(
      album.map((item) => (item.id === id ? { ...item, ...data } : item))
    )

    // reset albumEdit state
    setAlbumEdit({
      item: {},
      edit: false,
    })
  }

  // set album to be updated
  const editAlbum = (item) => {
    setAlbumEdit({
      item,
      edit: true,
    })
  }

  return (
    <AlbumContext.Provider
      value={{
        album,
        albumEdit,
        isLoading,
        deleteAlbum,
        addAlbum,
        editAlbum,
        updateAlbum,
      }}
    >
      {children}
    </AlbumContext.Provider>
  )
}

export default AlbumContext
