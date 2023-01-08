const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", (req, res) => {
  Celebrity.find().then((result) => res.render("movies/new-movie", { result }));
});

router.post("/movies/create", (req, res) => {
  Movie.create(req.body)
    .then(() => res.redirect("/movies"))
    .catch((error) => res.redirect("/movies/new-movie"));
});

router.get("/movies", (req, res) => {
  Movie.find()
    .populate("cast")
    .then((result) => {
      res.render("movies/movies", { result });
    })
    .catch((error) => res.redirect("/movies/new-movie"));
});

router.get("/movies/:id", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((result) => {
      res.render("movies/movie-details", result);
    })
    .catch((error) => res.redirect("/movies"));
});

router.post("/movies/:id/delete", (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/movies"))
    .catch((error) => res.redirect("/movies"));
});

router.get("/movies/:id/edit", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => res.render("movies/edit-movie", movie));
});

router.post('/movies/:id', (req, res) => {
  const updatedMovie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };
  Movie.findByIdAndUpdate(req.params.id, updatedMovie, { new: true })
    .then(() => {
      return res.redirect(`/movies/${req.params.id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
