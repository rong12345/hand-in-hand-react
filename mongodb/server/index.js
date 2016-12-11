const mongoose = require('mongoose');

var Post = require('./models/post');

const express =  require('express');
const app = express();
const cors = require('cors');
app.use(cors());

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/jiangrong');
//执行此代码之前，要保证　mongodb 数据库已经运行了，而且运行在　27017　端口


var db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() {
  let post = new Post({name:'incode',age:'incode'});
  post.save(function(err){
    if(err) console.log(err);
  })
  console.log('success!')
});

// 下面三行就是我们实现的一个 API
app.get('/name', function(req, res){
  res.json({"name": "jiangrong"});
})

app.listen(3000, function(){
  console.log('running on port 3000...');
});

// var express = require('express');
// var  app = express();
// var bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))
//
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/digicity-express-api');
//
//
// var Post = require('./models/post');
//
// var db = mongoose.connection;
// db.on('error', console.log);
// db.once('open', function() {
//   console.log('success!')
// });
//
//
// app.get('/posts', function(req, res) {
//   Post.find().exec(function(err, posts) {
//     res.json({ post: posts})
//   });
// })
// app.post('/posts/', function(req, res) {
//   // res.send('the post title is: ' + req.body.title)
//   var post = new Post({title: req.body.title});
//   post.save(function(err){
//     if(err) console.log(err);
//     console.log('saved!');
//   })
//   res.redirect('/posts');
// })
// app.listen(3000, function() {
//   console.log('running on port 3000')
// })
