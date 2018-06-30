var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // .render: es un método que renderiza plantillas
  // con el motor seteado en app.set view-engine
  res.render('home', { clase: 'S560' });
});

router.get("/clase", (req, res) => {
  let nombres = [];

  if (req.query.nombres) {
    nombres = req.query.nombres.split(',');
  }

  return res.status(200).render("home", { nombres });
});

module.exports = router;
