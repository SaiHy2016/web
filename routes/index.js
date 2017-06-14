var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var db=mongoose.connect('mongodb://localhost/test');
var PersonSchema = new mongoose.Schema({
  name: String,
  title: String,
  content: String
})
var PersonModel = db.model('Person',PersonSchema)


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '我的网站' });
});

router.get('/mongodb', function (req, res, next) {
  PersonModel.find((err,docs) => {
    res.render('mongodb', res.render('mongodb',{lists:docs}));
  })
});


//ajax
router.post('/mongodbadd', function (req, res, next) {

  var personEntity = new PersonModel({
    name: req.body.name,
    title: req.body.title,
    content: req.body.content
  })
  personEntity.save((err,doc) => {
    if (err) res.send(err)
    PersonModel.find((err,docs) => {
      res.send(docs)
    })
  })
});

router.get('/mongodbsan', (req, res, next) => {
  var o = {}
  req.query.name&&(o.name=req.query.name)
  req.query.title&&(o.title=req.query.title)
  req.query.content && (o.content = req.query.content)
  PersonModel.remove(o, (err, docs) => {
    console.log('err:')
    console.log(err)
    console.log('docs:')
    console.log(docs)
    PersonModel.find((err, docs) => {
      res.send(docs)
    })
  })
})

module.exports = router;
