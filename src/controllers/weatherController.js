const axios = require("axios")
const ApiError = require("../classes/ApiError")



const {
    WEATHER_API_URL,
    WEATHER_API_URL_KEY,
}= process.env


exports.searchResult = async(req,res,next) =>{
    const { keyword} = req.body

    try {
        if(!keyword) throw new ApiError(400,"Request should contain search ")
        const response = await axios({
            url :WEATHER_API_URL+keyword+WEATHER_API_URL_KEY,
            method:"get",
            params:{  units: "metric",}
        })

        const data = response 
        console.log("axios response is :",data)
        res.status(200).json({data})
        
    } catch (error) {
        console.log("Search result error",error)
        next(error)
    }

}
