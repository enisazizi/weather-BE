const services = require("express").Router()


const usersRoute = require("./users")
const weatherRoute = require("./weatherapi")


services.use("/users",usersRoute)
services.use("/weather",weatherRoute)

module.exports = services