const axios = require("axios");
const asyncHandler = require("express-async-handler");
const discogs = require("disconnect").Client;

// TD - modify page variable to be stored, and incremented with each search. Resetting when a new search is made

//@desc Search for albums on Discogs
//@route GET /api/discogs/search
//@access Public
const searchAlbums = asyncHandler(async (req, res) => {
  const { query, page } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Invalid query" });
  }

  const perPage = 10;
  const resultTarget = 15; // number of results to return
  const discogUrl = "https://api.discogs.com/database/search";
  const albumData = [];
  const albums = [];
  let currentPage = page; // current page of results
  let totalPages = 0; // total number of pages of results
  let totalResults = 0;
  // check if query exists and is valid

  const encodedQuery = encodeQuery(query);
  const cleanedQuery = cleanString(query, " ");

  // request data from discogs api until we have enough results or we run out of results
  do {
    const data = requestDiscogsData({
      query: encodedQuery,
      type: "master",
      format: "album",
      perPage: perPage,
      page: page,
      url: discogUrl,
    });

    //? check for errors on the first run through the loop else check for end of results.
    if (currentPage === page) {
      // Return a 400 status code and an error message if the API returns an error message
      if (data.message) {
        return res.status(400).json({ message: "Invalid input" });
      }
      // Return a 400 status code and an error message if the API returns no results
      if (data.results.length === 0) {
        return res.status(400).json({ message: "No results found" });
      }

      totalPages = data.pagination.pages;
      totalResults = data.pagination.items;
    } else {
      if (data.results.length === 0) {
        break; // no more results
      }
    }

    const processedData = processAlbumData(data.results, cleanedQuery);

    albumData.push(...processedData); // add results to albumData

    // set albumData to the results from removeDuplcates function call
    albumData = removeDuplicates(albumData);

    currentPage++; // increment page number
  } while (
    albumData.length < resultTarget &&
    (currentPage <= totalPages || totalPages !== 0)
  );

  //! want to return albums, and request page data.
  //* SUCCESS: return the albums and the page number
  return res.status(200).json({ albumData, page });
});

// gets specific album and returns tracklist
const searchAlbumById = asyncHandler(async (id) => {
  if (!id) {
    return null;
  }

  const url = "https://api.discogs.com/releases/";

  const { data } = await axios.get(`${url}${id}`, {
    headers: {
      Authorization: `Discogs key=${process.env.DISCOGS_API_KEY}, secret=${process.env.DISCOGS_SECRET}`,
    },
  });

  if (data.message || !data) {
    return null; // return null if no album is found
  }

  return data;
});

const getTrackList = asyncHandler(async (id) => {
  const album = searchAlbumById(id);

  if (!album || album.tracklist.length === 0) {
    return []; // return empty array if no album is found
  }

  const tracklist = album.tracklist.map((track) => {
    return {
      position: track.position,
      trackTitle: track.title,
      duration: track.duration,
    };
  });
  return tracklist;
});

// returns runtime in seconds. Expects tracklist to be in the format of "mm:ss"
const getRuntime = (trackList) => {
  const runtime = trackList.reduce((acc, track) => {
    const [min, sec] = track.duration.split(":").trim().replace(/\s+/g, ""); // remove potential whitespace
    return acc + parseInt(min) * 60 + parseInt(sec);
  }, 0);
  return runtime;
};

/// HELPER FUNCTIONS ///

// clean query string
const cleanString = (query, string) => {
  const cleanedQuery = query.toString().replace(/\s+/g, string).trim();
  return cleanedQuery;
};

// encode query string
const encodeQuery = (query) => {
  const cleanQuery = cleanQuery(query, "+").toLowerCase();
  return encodeURIComponent(cleanQuery);
};
// checks for errors in the API response
const checkForErrors = (data) => {
  // Return a 400 status code and an error message if the API returns an error message
  if (data.message) {
    return res.status(400).json({ message: "Invalid input" });
  }

  // Return a 400 status code and an error message if the API returns no results
  if (data.results.length === 0) {
    return res.status(400).json({ message: "No results found" });
  }
};

// makes a request to the Discogs API and returns the data
const requestDiscogsData = async (params) => {
  const { query, type, format, perPage, page, url } = params;
  const { data } = await axios.get(url, {
    params: {
      q: query, // search query
      anv: query, // search for artist name variations as well
      type: type, // only return master releases
      format: format, // filter by format
      per_page: perPage, // number of results per page
      page: page,
    },
    headers: {
      Authorization: `Discogs key=${process.env.DISCOGS_API_KEY}, secret=${process.env.DISCOGS_SECRET}`,
    },
  });

  return data;
};

// processes album data from the Discogs API
const processAlbumData = (data, query) => {
  return data.buildAlbumList(data).filterAlbums(data, query);
};

// builds list of albums from discogs data
const buildAlbumList = (data) => {
  return data.map((album) => {
    const [artist, title] = album.title.split(" - ");
    const cleanedTitle = cleanString(title, " ");
    const cleanedArtist = cleanString(artist, " ");

    const trackList = getTrackList(album.id);
    let runtime = 0;
    if (trackList.length !== 0) {
      runtime = getRuntime(trackList.duration); // runtime in seconds
    }

    return {
      title: cleanedTitle,
      artist: cleanedArtist,
      genre: album.genre[0],
      style: album.style, // subgenre
      year: album.year,
      trackList: trackList,
      runtime: runtime,
      image: album.cover_image,
      thumb: album.thumb,
      format: album.format,
      masterId: album.master_id, // unique identifier, and can be used to get the tracklist & artist info
      discogsId: album.id,
    };
  });
};

// filters an album list by the query
const filterAlbums = (data, query) => {
  return data.filter((album) => {
    return [
      album.artist,
      album.title,
      album.genre,
      album.style,
      album.year,
    ].some((field) =>
      field.toString().toLowerCase().includes(query.toLowerCase())
    );
  });
};

// removes duplicate albums from an album list
const removeDuplicates = (data) => {
  data.reduce((acc, cur) => {
    if (!acc.find((album) => album.masterId === cur.masterId)) {
      acc.push(cur);
    }
    return acc;
  }, []);
};

// create an array of objects with only the data we need
function createAlbumList(data, query) {
  return data
    .buildAlbumList(data)
    .filterAlbums(data, query)
    .removeDuplicates(data);
}

module.exports = {
  searchAlbums,
};
