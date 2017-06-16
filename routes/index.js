var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var db=mongoose.connect('mongodb://localhost/test');
var PersonSchema = new mongoose.Schema({
  name: String,
  title: String,
  content: String
})
var checkinSchema = new mongoose.Schema({
  name:String,
  time: String,
})

var PersonModel = db.model('Person',PersonSchema)
var checkinModel = db.model('checkin',checkinSchema)


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '我的网站' });
});

router.get('/checkin', function (req, res, next) {
  let t = new Date(), y = t.getFullYear(), m = t.getMonth() + 1,reg
  //判断 天 年
  if (m == 1) {
    y -= 1
    reg=`^(${y}-12)|(${y+1}-1|2)-\\d{1,2}\\b`
  } else if(m==12) {
    y += 1
    reg=`^(${y-1}-(11|12))|(${y}-1)-\\d{1,2}\\b`
  } else {
    reg=`^${y}-(${m}|${m-1}|${m+1})-\\d{1,2}\\b`
  }
  console.log(reg)
  checkinModel.find({ name: '胡渊', time: { $regex: reg}},function (err, docs) {
    var log=docs.map(function (v,i) {
      v.time=v.time.split(/\s/g)[0]
      return v
    })

    var days=[31,28,31,30,31,30,31,31,30,31,30,31]
    if ((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)){
      days[1]=29
    }

    console.log(log)
    console.log('几号date '+t.getDate())
    console.log('星期几day '+t.getDay())
    console.log('这个月几天days'+days)
    
    res.render('checkin', {
      year: t.getFullYear(),
      month: t.getMonth(),//月份0-11
      date: t.getDate(),
      day: t.getDay(),//星期0-6
      days:days,
      log: log
    });
  })
});

router.get('/mongodb', function (req, res, next) {
  PersonModel.find({name:'胡渊'},function(err,docs){
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
  personEntity.save(function(err,doc){
    if (err) res.send(err)
    PersonModel.find(function(err,docs){
      res.send(docs)
    })
  })
});

router.get('/mongodbsan', function(req, res, next) {
  var o = {}
  req.query.name&&(o.name=req.query.name)
  req.query.title&&(o.title=req.query.title)
  req.query.content && (o.content = req.query.content)
  PersonModel.remove(o, function(err, docs){
    PersonModel.find(function(err, docs) {
      res.send(docs)
    })
  })
})

router.get('/check_in', function (req, res, next) { 
  checkinModel.create({name:'胡渊',time:(new Date()).toLocaleString()}, function (err,docs) {
    var d=1
    res.send(`你已签到${d}天`)
  })
})


module.exports = router;
