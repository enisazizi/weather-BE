const weatherRoute = require("express").Router()

const {
    searchResult,
}= require("../../controllers/weatherController")

const {validateToken} = require("../../middlewares/auth")


weatherRoute.post("/search",searchResult)

module.exports = weatherRoute