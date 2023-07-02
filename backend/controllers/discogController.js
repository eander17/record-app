/**
 * eslint-disable no-await-in-loop
 *
 * @format
 */

/**
 * eslint-disable no-await-in-loop
 *
 * @format
 */

/** @format */

const axios = require('axios')
const asyncHandler = require('express-async-handler')

// TD - modify page variable to be stored, and incremented with each search. Resetting when a new search is made

// @desc Search for albums on Discogs
// @route GET /api/discogs/search
// @access Public
const searchAlbums = asyncHandler(async (req, res) => {
  const { query, page } = req.query

  console.log(`discog controller: query: ${query}, page: ${page}`)

  // check if query exists
  if (!query || !page) {
    return res.status(400).json({ message: 'Invalid query' })
  }

  const perPage = 10
  const resultTarget = 15 // number of results to return
  let albumData = [] // will hold album objects
  let currentPage = page // current page of results
  let totalPages = 0 // total number of pages of results
  let totalResults = 0 // total number of results from request

  const encodedQuery = encodeQuery(query)
  const cleanedQuery = cleanString(query, ' ')

  const key = process.env.DISCOGS_API_KEY
  const secret = process.env.DISCOGS_SECRET

  // request data from discogs api until we have enough results or we run out of results
  do {
    // eslint disable-next-line
    // eslint-disable-next-line no-await-in-loop
    const { data } = await axios.get(
      'https://api.discogs.com/database/search',
      {
        params: {
          q: encodedQuery,
          type: 'master',
          format: 'album',
          per_page: perPage,
          page: currentPage,
        },
        headers: {
          Authorization: `Discogs key=${key}, secret=${secret}`,
        },
      },
    )

    // ? check for errors on the first run through the loop else check for end of results.
    if (currentPage === page) {
      // Return a 400 status code and an error message if the API returns an error message
      if (data.message) {
        return res.status(400).json({ message: 'Invalid input' })
      }
      // Return a 400 status code and an error message if the API returns no results
      if (data.results.length === 0) {
        return res.status(400).json({ message: 'No results found' })
      }

      totalPages = data.pagination.pages
      totalResults = data.pagination.items
    } else if (data.results.length === 0) {
      console.log('No more results')
      break // no more results
    }

    const processedData = processAlbumData(data.results, cleanedQuery)

    albumData.push(...processedData) // add results to albumData

    // set albumData to the results from removeDuplicates function call
    albumData = removeDuplicates(albumData)

    currentPage++ // increment page number
  } while (
    albumData.length < resultTarget &&
    (currentPage <= totalPages || (totalPages === 0 && currentPage === 1))
  )

  // get tracklist and runtime and add to albums in albumData
  await Promise.all(
    albumData.map(async (album) => {
      const tracklist = await getTrackList(album.masterId)
      const runtime = getRuntime(tracklist)

      album.trackList.push(tracklist)
      // eslint-disable-next-line no-param-reassign
      album.runtime = runtime
    }),
  )
    .then(() => {
      console.log(`AlbumData: ${JSON.stringify(albumData)}`)
      console.log('all promises resolved successfully')
      //* SUCCESS: return the albums and the page data
      // return res
      //   .status(200)
      //   .json({ albumData, currentPage, totalPages, totalResults })
    })
    .catch((err) => {
      console.log(`error: ${err}`)
      return res.status(500).json({ message: 'something went wrong here' })
    })

  return res
    .status(200)
    .json({ albumData, currentPage, totalPages, totalResults })
})

// gets specific album and returns tracklist
const searchAlbumById = async (id) => {
  if (!id) {
    return null
  }

  const url = 'https://api.discogs.com/masters/'

  const { data } = await axios.get(`${url}${id}`, {
    headers: {
      Authorization: `Discogs key=${process.env.DISCOGS_API_KEY}, secret=${process.env.DISCOGS_SECRET}`,
    },
  })

  if (data.message || !data) {
    return null // return null if no album is found
  }

  const album = {
    title: data.title,
    artist: data.artists[0].name,
    genre: data.genres[0],
    style: data.styles,
    year: data.year,
    tracklist: data.tracklist,
  }

  return album
}

/// ALBUM OBJECT BUILDING FUNCTIONS ///
// processes album data from the Discogs API
const processAlbumData = (data, query) => {
  // return data.buildAlbumList(data).filterAlbums(data, query);
  const list = buildAlbumList(data)
  const filtered = filterAlbums(list, query)
  return filtered
}

// builds list of albums from discogs data
const buildAlbumList = (data) => {
  const albums = data.map((album) => {
    const [artist, title] = album.title.split(' - ')
    const cleanedTitle = cleanString(title, ' ')
    const cleanedArtist = cleanString(artist, ' ')

    return {
      title: cleanedTitle,
      artist: cleanedArtist,
      genre: album.genre[0],
      style: album.style, // subgenre
      year: album.year,
      trackList: [],
      runtime: 0,
      image: album.cover_image,
      thumb: album.thumb,
      format: album.format,
      masterId: album.master_id, // unique identifier, and can be used to get the tracklist & artist info
      discogsId: album.id,
    }
  })
  return albums
}

// filters an album list by the query
const filterAlbums = (data, query) =>
  data.filter((album) =>
    [album.artist, album.title, album.genre, album.style, album.year].some(
      (field) => field.toString().toLowerCase().includes(query.toLowerCase()),
    ),
  )

// removes duplicate albums from an album list
const removeDuplicates = (data) =>
  data.reduce((acc, cur) => {
    if (!acc.find((album) => album.masterId === cur.masterId)) {
      acc.push(cur)
    }
    return acc
  }, [])

/// ALBUM TRACK lIST FUNCTIONS ///
const getTrackList = async (id) => {
  const album = await searchAlbumById(id)

  if (!album || album.tracklist.length === 0) {
    return [] // return empty array if no album is found
  }
  const tracklist = album.tracklist.map((track) => {
    let dur = track.duration
    if (!track.duration) dur = '00:00'
    return {
      position: track.position,
      trackTitle: track.title,
      duration: dur,
    }
  })

  return tracklist
}

// returns runtime in seconds. Expects tracklist to be in the format of "mm:ss"
const getRuntime = (trackList) => {
  if (!trackList) return 0

  const runtime = trackList.reduce((acc, track) => {
    let [min, sec] = track.duration
      .toString()
      .split(/[\s:]+/)
      .map((part) => parseInt(part, 10))
    if (!sec) sec = 0
    if (!min) min = 0
    return acc + min * 60 + sec
  }, 0)
  return runtime
}

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

module.exports = {
  searchAlbums,
}
