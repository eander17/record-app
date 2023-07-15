import axios from 'axios'

const API_URL = '/api/collection/'

/// API calls

const updateAlbum = async (id, album, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + id, album, config)
  return response.data
}

const deleteAlbum = async (albumId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + albumId, config)
  return response.data
}

const albumApiService = {
  updateAlbum,
  deleteAlbum,
}

export default albumApiService
