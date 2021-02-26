const weatherRoute = require("express").Router()

const {
    searchResult,
}= require("../../controllers/weatherController")

const {validateToken} = require("../../middlewares/auth")


weatherRoute.post("/search",validateToken,searchResult)

module.exports = weatherRoute