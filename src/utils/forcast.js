let request = require('request')


let weatherapiKey = 'c964a3d9fdec6412c076591af13e91f8'


const forcast = (error, {longitude, latitude}, callback)=>{
    if (error){
        console.log(error)
    }else{
    let url = `http://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&appid=${weatherapiKey}&units=metric`
    request({url, json: true },  (err, {body}) => {
        if(err){
          console.log('error:', err);
        } else if (body.message) {
           console.log(body.message)
         } else {
             const data ={
            temp : body.main.temp,
            cloud : body.clouds.all,
            description: body.weather[0].description
             }
             callback(error, data)
        }
      })}
    
}

module.exports = {
    forcast
}