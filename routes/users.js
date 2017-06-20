var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')

var db = mongoose.createConnection('mongodb://localhost/qian')

var model = new mongoose.Schema({
  name: String,
  time: Number 
})

var qian=db.model('qian',model)

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('wellcome to users');
});

router.get('/qian', function (req, res, next) {
  res.render('qian',{})
});

//qian 接口
router.get('/qian/find', function (req, res, next) {
  qian.find({
    name: '胡渊',
    time: {
      $gte:req.query.ds,
      $lte:req.query.de
    }
      }, ['time'], function (err, docs) {
    if (err) res.send(err)
    res.json(docs)
  })
});
router.get('/qian/qiandao', function (req, res, next) {
  console.log(req.query.date)
  qian.create({name: req.query.name, time: req.query.date }, (err,docs)=> {
    if(err) res.send('添加失败')
    res.send('添加成功')
  })
});


module.exports = router;
