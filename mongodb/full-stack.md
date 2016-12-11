---
title: 打通全栈
---

这一节算是前面的几节内容的综合使用。所谓全栈项目，要有这几层技术组成：

- 最贴近用户的，是 React
- HTTP 请求，用 axios
- 后台，我们使用 express
- 最底层，海量数据，用 Mongodb

在，https://happypeter.github.io/digicity/express/2-with-react.html 中，我们实际已经打通了三层技术，同时 https://happypeter.github.io/digicity/express/4-mongoose.html 中
我们又学习了 MongoDB 。本节就来综合使用这两部分知识。从而打通全栈。

我们分几个具体任务来完成：

### 使用 Mongoose 来查询所有用户

首先，保证 mongodb 处于运行状态，然后，通过　mongo-express 查看一下，
mongodb 中是否有多个用户。

实际工作中，开发者是通过看　[Mongoose 的　API 文档](http://mongoosejs.com/docs/api.html) 来解决这个问题。但是起步阶段，
还是要先通过教程，来学习一些最基本的使用，后续才会有你能力看　API 文档。

参考：http://haoqicat.com/react-express-api/5-rest-api



```
db.once('open', function() {
  Post.find().exec(function(err, posts) {
    console.log(posts);
  });
});
```
这样，我们到　express-hello 文件夹中，运行，可以看到如下输出结果


```
$ node index.js
running on port 3000...
[ { _id: 584b62b830a2a2cbf4c4c3f6,
    username: 'billie66',
    email: 'billie@billie66.com' },
  { _id: 584bb045ff8f0f1c7ba4fe24,
    username: 'inCode',
    email: 'inCode@incode.com',
    __v: 0 } ]
```

可以看到，终端中可以打印出所有数据文档。证明我们的　mongoose 的　find() 接口
使用正确。

但是，我们为何不把代码写成这样呢？

```
let posts = Post.find();
conole.log(posts)
```

答案是：　find() 接口是一个**异步函数**，所以它的返回值　`posts` 只能
在回调函数中使用。`.exec` 字面意思就是**执行**，我们把回调函数穿给它做参数。

关于**同步**和**异步** 后面我们开专题再讲。

### 用 API 来返回　JSON

上面数据虽然拿到，但是如果想提供给客户端使用：

- 第一步，把它要封装成一个　API
- 第二步，数据格式转换为　JSON

先来做第一步，代码做出如下调整：

```
db.once('open', function() {
  console.log('success');
});

app.get('/posts', function(req, res){
  Post.find().exec(function(err, posts) {
    console.log(posts);
  });
})
```

上面把　Post.find() 代码封装到了一个　API ( Web API ) 。这样，
触发条件就变了。只有当客户端发出　`GET /posts` 请求的时候，User.find()
代码才会被执行。

暂时，我们用　curl 来模拟一下客户端请求后台数据：

```
curl -X GET http://localhost:3000/posts
```
但是此时，curl请求不到任何返回信息，因为`console.log(posts)`只会把信息打印到后台终端，curl请求不到信息，未来浏览器也就请求不到。所以要把代码改为
```js
// res.send() 可以数据返回客户端，但是我们需要的是json ，所以用下面接口
res.json()
```

也就是要写成这样：

```js
app.get('/posts', function(req, res){
  // res.json({"posts": "happypeter"});
  User.find().exec(function(err, posts) {
    res.json({posts});
  });
})
```
这时用curl就可以请求到信息了

```
$ curl -X GET http://localhost:3000/users
{"users":[{"_id":"584b62b830a2a2cbf4c4c3f6","username":"billie66","email":"billie@billie66.com"},{"_id":"584b760498d7b520b68a05cd","username":"pppaaa"},{"_id":"584bb045ff8f0f1c7ba4fe24","username":"inCode","email":"inCode@incode.com","__v":0}]}
```

这样，后台代码就准备完毕。

###　后台代码

express-hello 文件夹中，有下面的文件：

index.js

```js
const express =  require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/digicity');
// 执行此行代码之前，要保证 mongodb 数据库已经运行了，而且运行在 27017 端口



var db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() {
  console.log('success');
});


// 下面三行就是我们实现的一个 API
app.get('/users', function(req, res){
  // res.json({"users": "happypeter"});
  User.find().exec(function(err, users) {
    res.json({users});
  });
})


app.listen(3000, function(){
  console.log('running on port 3000...');
});
```

models/user.js

```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String },
    email: { type: String }
  }
);
module.exports = mongoose.model('User', UserSchema);
// `User` 会自动对应数据库中的　users 这个集合
// 如果这里是　Apple 那么就会对应　apples 集合
// 如果这里是　Person 那么就会对应　people 集合
```

package.json

```json
{
  "name": "express-hello",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.1",
    "express": "^4.14.0",
    "mongoose": "^4.7.2"
  }
}
```


### 前台书写　axios 请求

到　react-with-express/　也就前台项目中，修改生命周期函数如下：

```js
componentWillMount() {
  axios.get('http://localhost:3000/users').then((response) => {
    console.log(response);
      // this.setState({username: response.data.username});
  })
}
```
