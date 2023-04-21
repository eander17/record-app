import axios from 'axios'

const API_URL = '/api/collection/'

// Create new album
const createAlbum = async (albumData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, albumData, config)

  return response.data
}

// Get user album collection
const getCollection = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// get user album by id
const getAlbumById = async (albumId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }, 
  }
  const response = await axios.get(API_URL + albumId, config)
  return response.data
}



// Update user album
const updateAlbum = async (albumId, albumData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + albumId, albumData, config)
  return response.data // return updated album
}

// Delete user album
const deleteAlbum = async (albumId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + albumId, config)

  return response.data
}

const collectionService = {
  createAlbum,
  getCollection,
  deleteAlbum,
  getAlbumById, 
  updateAlbum,
}


export default collectionService
