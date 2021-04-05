
const express = require("express")
const movieTrailer = require("./routes/movieTrailer")
const app = express()
const port = 3000

app.set("view engine", "ejs");
app.get("/", function(req, res) {
    res.render("search");
});
app.use('/',movieTrailer)
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
