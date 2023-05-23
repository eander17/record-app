const axios = require("axios");
const asyncHandler = require("express-async-handler");
const discogs = require("disconnect").Client;

const searchAlbums = asyncHandler(async (req, res) => {
  const { query, page } = req.query;
  const { data } = await axios.get("https://api.discogs.com/database/search", {
    params: {
      q: query,
      type: "release",
      format: "vinyl,album",
      per_page: 50,
      page: page,
    },
    headers: {
      Authorization: `Discogs key=${process.env.DISCOGS_API_KEY}, secret=${process.env.DISCOGS_SECRET}`,
    },
  });

  if (data.message) {
    // Return a 400 status code and an error message if the API returns an error message
    return res.status(400).json({ message: "Invalid input" });
  }

  // Return a 404 status code and an error message if the API returns no results
  if (data.results.length === 0) {
    res.status(404);
    throw new Error("No albums found");
  }

  // Map the results to a new array of objects with only the data we need
  const albums = data.results
    .map((album) => {
      const [artist, title] = album.title.split(" - ");
      return {
        title: title,
        artist: artist,
        genre: album.genre[0],
        year: album.year,
        image: album.thumb,
        discogsId: album.id,
      };
    })
    .filter((album) => {
      return [album.artist, album.title, album.genre].some((field) =>
        field.toString().toLowerCase().includes(query.toLowerCase())
      );
    })
    .reduce((acc, cur) => {
      if (
        !acc.find(
          (album) =>
            album.title.toString().toLowerCase() ===
              cur.title.toString().toLowerCase() &&
            album.artist.toString().toLowerCase() ===
              cur.artist.toString().toLowerCase()
        )
      ) {
        acc.push(cur);
      }
      return acc;
    }, []);

  return res.status(200).json({ albums, page });
});

module.exports = {
  searchAlbums,
};
