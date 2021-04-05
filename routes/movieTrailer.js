var request = require('request');
const express = require("express")
const router = express()

var data = [];     
router.get('/results', function (req, res) {
  var search = req.query.search;
  var optionsVideo = {
    method: 'get',
    url: `https://www.rottentomatoes.com/api/private/v1.0/movies/${search}`,
    headers: {
      'x-rapidapi-key': '64188f98demshb0cd086b0efe813p17af82jsn2acb3478e376'
    }
  }; 
  var optionsImg = {
      method: 'get',
      url: `https://movie-database-imdb-alternative.p.rapidapi.com/?s=` + search,
      headers: {
        'x-rapidapi-key': '64188f98demshb0cd086b0efe813p17af82jsn2acb3478e376'
      }
    };
  request(optionsImg, function (error, response, body) {
        if (!error) {
            var parseDataImg = JSON.parse(body);
            var data1 =  parseDataImg.Search; 
            for(var i = 0; i <data1.length; i++){            
                data.push({"Title":data1[i].Title, "Year":data1[i].Year, "Poster":data1[i].Poster , "Url": data1[i].Poster});
                // console.log(data)                
            }
        }         
    });   
    request(optionsVideo, function (error, response, body) {
        if (!error) {
          var parsedata = JSON.parse(body);
          data.push({"Title":parsedata.title, "Year":parsedata.year, "Poster":parsedata.posters.original, "Url": parsedata.videoClips.mainTrailer.mp4Url });     
        }
        res.render("results", {search: search, data: data});
    });     
    data = [];
})
module.exports = router;
