const express = require("express");
const router = express.Router();

const { searchAlbums } = require("../controllers/discogController");

router.route("/").get(searchAlbums);
router.route("/:id").get(findAlbumById); // use discogId to get album info

module.exports = router;
