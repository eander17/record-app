/** @format */
/* eslint-disable camelcase */

const axios = require('axios')
const asyncHandler = require('express-async-handler')

const searchAlbums = asyncHandler(async (req, res) => {
  const { query, page } = req.query

  // check if query exists
  if (!query) return res.status(400).json({ message: 'Invalid query' })

  const resultTarget = 15 // number of results to return
  const q = encodeQuery(query)
  const type = 'release'
  const format = 'album'
  const per_page = 50
  const currentPage = page || 1
  const URL = `https://api.discogs.com/database/search?q=${q}&type=${type}&format=${format}&per_page=${per_page}&page=${currentPage}`

  const initialData = {
    pagination: { page: currentPage, per_page, urls: { next: URL } },
    results: [],
  }

  const albumData = await getSearchResults(resultTarget, initialData)

  // const dataTitles = albumData.results.map((album) => album.title)

  if (albumData.error) return res.status(400).json({ message: albumData.error })

  // could just return albumData along with pagination info from discogs.
  return res.status(200).json(albumData)
})

/// recursive function that returns a list of albums from discogs api
// info: recursively calls itself until we have enough results or we run out of results
// @param: target - number of results we want
// @param: params - object containing query, type, format, per_page, page
// @param: results - array of results
const getSearchResults = async (target, prevData) => {
  if (
    prevData.results &&
    (prevData.results.length >= target || !prevData.pagination.urls.next)
  ) {
    return prevData
  }

  const URL = prevData.pagination.urls.next

  const data = await makeRequest(URL)

  if (data.message && prevData.results.length === 0) {
    console.log('triggered first error check')
    console.log(`data.message: ${data.message}`)
    return { error: data.message } // return error message if no results
  }
  if (data.pagination.items === 0 && prevData.results.length === 0) {
    console.log(
      `triggered second error check - data.pagination.items: ${data.pagination.items}`,
    )
    return { error: 'No results found' } // return error message if no results
  }
  if (data.results.length === 0) {
    console.log('triggered end of search results check')
    return {
      ...prevData,
      pagination: { ...prevData.pagination, urls: { next: null } }, // return prevData if no more results
    }
  }

  const query = prevData.pagination.urls.next.split('q=')[1].split('&')[0]

  const processedResults = processAlbumResults(
    prevData.results,
    data.results,
    query,
  )

  return getSearchResults(target, {
    ...data,
    results: processedResults,
  })
}

/// Request discogs API
const makeRequest = async (URL) => {
  const { DISCOGS_API_KEY } = process.env
  const { DISCOGS_SECRET } = process.env

  try {
    const { data } = await axios.get(URL, {
      headers: {
        Authorization: `Discogs key=${DISCOGS_API_KEY}, secret=${DISCOGS_SECRET}`,
      },
    })
    return data
  } catch (error) {
    console.log(`error: ${error}`)
    return { message: error.message }
  }
}

/// Process discogs API data. Given data.results as parameter
// info: builds list of album objects from data, then removes duplicates
const processAlbumResults = (prevData, newData, query) => {
  const mappedData = mapData(newData)

  const decodedQuery = decodeURIComponent(query).replace(/\+/g, ' ')

  const filteredData = filterData(mappedData, decodedQuery)
  filteredData.splice(0, 0, ...prevData)

  const reducedData = removeDuplicates(filteredData)
  return reducedData
}

const mapData = (data) =>
  data.map((album) => {
    const [artist, title] = album.title.split(' - ')
    const cleanedTitle = cleanString(title, ' ')
    const cleanedArtist = cleanString(artist, ' ')
    return {
      title: cleanedTitle || 'N/A', //! required
      artist: cleanedArtist || 'N/A', //! required
      genres: album.genre || 'N/A',
      year: album.year || 'N/A',
      image: album.cover_image || 'N/A',
      thumb: album.thumb || 'N/A',
      format: album.format || 'N/A',
      masterId: album.master_id || 0, //! required - can search by id to find other fields.
      discogsId: album.id || 'N/A', // todo: implement search by discogid
    }
  })

const filterData = (data, query) => {
  const validItems = filterOutInvalid(data)
  const matchesQuery = filterByQuery(validItems, query)
  return matchesQuery
}

const filterOutInvalid = (data) =>
  data.filter((album) => {
    if (!album) return false
    if (!album.title || !album.artist) return false
    if (
      album.title === 'N/A' ||
      album.artist === 'N/A' ||
      album.discogsId === 'N/A'
    ) {
      return false
    }
    return true
  })

const filterByQuery = (data, query) =>
  data.filter((album) =>
    [album.title, album.artist].some((field) =>
      field.toString().toLowerCase().includes(query.toLowerCase()),
    ),
  )

const removeDuplicates = (data) =>
  data.reduce((list, album) => {
    if (
      !list.find(
        (item) => item.title === album.title && item.artist === album.artist,
      )
    ) {
      list.push(album)
    }
    return list
  }, [])

// /// HELPER FUNCTIONS ///

// clean query string
const cleanString = (query, string) => {
  const cleanedQuery = query.toString().replace(/\s+/g, string).trim()
  return cleanedQuery
}

// encode query string
const encodeQuery = (query) => {
  const cleanQuery = cleanString(query, '+').toLowerCase()
  return encodeURIComponent(cleanQuery)
}

/// ******** exports ******** ///

module.exports = {
  searchAlbums,
}
