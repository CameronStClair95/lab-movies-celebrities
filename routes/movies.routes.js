const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", (req, res) => {
  Celebrity.find().then((result) => res.render("movies/new-movie", { result }));
});

router.post("/movies/create", (req, res) => {
  Movie.create(req.body)
    .then(() => res.redirect("/movies"))
    .catch((error) => res.render("movies/new-movie"));
});

router.get("/movies", (req, res) => {
  Movie.find()
    .populate("cast")
    .then((result) => {
        console.log(result[0].cast)
        res.render("movies/movies", { result })});
});

module.exports = router;
