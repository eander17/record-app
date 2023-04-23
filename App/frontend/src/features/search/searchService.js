import axios from 'axios'

const API_URL = '/api/search/'

const searchAlbums = async (query, page) => {
  const response = await axios.get(API_URL, {
    params: { query: query, page: page },
  })
  return response.data
}

const searchService = {
  searchAlbums,
}

export default searchService
