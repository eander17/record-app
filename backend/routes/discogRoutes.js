const express = require("express");
const router = express.Router();

const { searchAlbums } = require("../controllers/discogController");

router.route("/").get(searchAlbums);

module.exports = router;
