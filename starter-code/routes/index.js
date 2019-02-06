const express = require('express');
const router  = express.Router();
const Place = require("../models/Place");

// CREATE
router.post('/', (req, res, next) => {
  let name = req.body.name;
  let type = req.body.type;

  Place.create({
    name, type
  });
  res.redirect("/");
});

// READ
router.get('/', (req, res, next) => {
  Place.find()
  .then(places => {
    res.render('index', {places});
  })
  .catch(err => console.log(err));
});

// UPDATE
router.get('/edit/:id', (req, res, next) => {
  Place.findById(req.params.id)
  .then((place) => res.render("edit", {place}))
  .catch(err => console.log(err));
});

router.post('/edit/:id', (req, res, next) => {
  let name = req.body.name;
  let type = req.body.type;
  Place.findByIdAndUpdate(req.params.id, {
    name, type
  })
  .then(() => res.redirect("/"))
  .catch(err => console.log(err));
});

// DELETE
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
