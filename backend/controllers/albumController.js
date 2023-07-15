const axios = require('axios')
const { Track } = require('../models/albumModel')

/// Function: GetTrackList ///
// info: gets the tracklist of an album from Discogs API
// @param: id - discogs album id
// @return: tracklist - array of track objects with fields: position, title, duration
const getTrackList = async (tracklist) => {
  if (!tracklist) return [] // return empty array if no album is found

  console.log(`getTrackList - tracklist: ${JSON.stringify(tracklist)}`)

  const trackObjects = []

  tracklist.forEach(async (track) => {
    console.log(`track: ${JSON.stringify(track)}`)

    const parsedDuration = parseDuration(track.duration)
    const trackObject = await new Track({
      position: track.position,
      title: track.title,
      duration: parsedDuration,
    })

    console.log(`trackObject: ${JSON.stringify(trackObject)}`)
    trackObjects.push(trackObject)
  })

  return trackObjects
}

/// Function: getRuntime ///
// info: computes total runtime from album tracklist
// @param: trackList - array of track objects with fields: position, title, duration
// @return: runtime - total runtime of album in seconds
const getRuntime = (trackList) => {
  console.log('in getRuntime')
  if (!trackList) return 0
  return trackList.reduce((time, track) => time + track.duration, 0)
}

/// gets specific album and returns tracklist
const searchAlbumByMasterId = async (id) => {
  if (!id) {
    return null
  }

  const URL = `https://api.discogs.com/masters/${id}`
  const { DISCOGS_API_KEY } = process.env
  const { DISCOGS_SECRET } = process.env

  const { data } = await axios.get(`${URL}`, {
    headers: {
      Authorization: `Discogs key=${DISCOGS_API_KEY}, secret=${DISCOGS_SECRET}`,
    },
  })

  if (data.message || !data) {
    console.log('data.message triggered')
    return null // return null if no album is found
  }

  const album = {
    title: data.title,
    artist: data.artists[0].name,
    genres: data.genres,
    styles: data.styles,
    year: data.year,
    tracklist: data.tracklist,
  }

  return album
}

const searchAlbumByDiscogs = async (id) => {
  if (!id) {
    return null
  }

  const URL = `https://api.discogs.com/releases/${id}`
  const { DISCOGS_API_KEY } = process.env
  const { DISCOGS_SECRET } = process.env

  const { data } = await axios.get(URL, {
    headers: {
      Authorization: `Discogs keys=${DISCOGS_API_KEY}, secret=${DISCOGS_SECRET}`,
    },
  })

  console.log(
    '🚀 ~ file: albumController.js:44 ~ searchAlbumByDiscogs ~ data:',
    data,
  )

  if (data.message || !data) {
    return null
  }

  return {
    title: data.title,
    artist: data.artists[0].name,
    genres: data.genres || [],
    styles: data.styles || [],
    year: data.year,
    tracklist: data.tracklist || [],
  }
}

/// function: parseDuration ///
// info: takes duration string in format "mm:ss" and returns seconds
// @param: duration - string in format "mm:ss"
// @return: seconds - integer
const parseDuration = (duration) => {
  if (!duration) return 0
  const [min, sec] = duration.split(/[\s:]+/).map((part) => parseInt(part, 10))
  return min * 60 + sec
}

module.exports = {
  getTrackList,
  getRuntime,
  searchAlbumByMasterId,
  searchAlbumByDiscogs,
}
