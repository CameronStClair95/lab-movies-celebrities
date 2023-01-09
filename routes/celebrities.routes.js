const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res) => {
  Celebrity.create(req.body)
    .then(() => res.redirect("/celebrities"))
    .catch((error) => res.render("celebrities/create"));
});

router.get("/celebrities", (req, res) => {
  Celebrity.find().then((result) =>
    res.render("celebrities/celebrities", { result })
  );
});

module.exports = router;
