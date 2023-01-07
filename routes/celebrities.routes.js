const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

router.get("/celebrities/create", (req, res) => {
    res.render('celebrities/new-celebrity')
}) 

router.post("/celebrities/create", (req, res) => {
    Celebrity.create(req.body)
    .catch(error =>
        res.render('celebrities/create'))
})













module.exports = router;
