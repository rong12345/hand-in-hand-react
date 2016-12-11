---
title: 使用 Mongoose 连接 JS 和 MongoDB
---


Mongoose 是一个 JS 库，作用是把 MongoDB 的数据，封装成 JS 对象。便于
我们用 JS 代码来操作 Mongodb 。

有了 Mongoose 之后，我们就可以用 JS 代码来进行增删改查了。

参考：

- 中文参考：http://ourjs.com/detail/53ad24edb984bb4659000013
- 管网：http://mongoosejs.com/
- nodeclass: http://www.nodeclass.com/api/mongoose.html#quick_start
- 操作步骤：http://haoqicat.com/react-express-api/3-mongoose

## 安装 Mongoose 包
通过 mongoose npm 包，让 Express 应用和 MongoDB 建立连接

```js
npm install --save mongoose
```
## 连接 MongoDB 数据库
打开 index.js 文件，导入mongoose：
```js
const mongoose = require('mongoose');
```

导入 mongoose 功能模块，然后添加一行代码:
```js
mongoose.connect('mongodb://localhost:27017/jiangrong')
```

通过 Mongoose 提供的connect() 方法连接到运行在本地的 jiangrong MongoDB 数据库。

然后，加入如下代码，判断连接是否成功：
```js
var db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() {
  console.log('success!')
});
```
## 构建 Post Model
新建一个文件 models/post.js，首先添加两行代码：
```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
```

导入 mongoose 功能模块以及调用它提供的 Schema() 接口创建一个新的 schema，每个 schema 会映射为 MongoDB 数据库中的一个 collection（集合），同时还能定义所映射集合包含的字段，以及字段的类型等规范。下面代码就创建了一个名为 PostSchema 的 schema, 并规定所映射的集合将包含三个字段：category、title 和 content，并且每个字段只能存储字符串类型的数据，其中 title 字段中存储的数据不能为空。
```js
const PostSchema = new Schema(
  {
    category: { type: String },
    title: { type: String, required: true },
    content: { type: String }
  },
  { timestamps: true }
);
```
选项 timestamps 的值设置为 true，则自动给所映射集合添加 createdAt 和 updatedAt 两个字段。
最后再添加一行代码：
```js
module.exports = mongoose.model('Post', PostSchema);
```

更改　dbonce 内容
```js
db.once('open', function() {
  let post = new Post({name:'incode',age:'incode'});
  post.save(function(err){
    if(err) console.log(err);
  })
  console.log('success!')
});
```
然后，后台重启　`node index.js` 看看数据库中，是否能添加一个文档
强调：｀Post` 对应　posts 集合，她本身是　models/post.js 中导出的一个
model 。所以说　Post 就是一个空盒子。而小写的　｀post` 是　`new Post`
得到的一个对象，`post` 对应一个实际的文档，所以小写的　`post` 中会真
正保存一个用户的实际　name 和 age 数据。

`post.save` 就是把　`post` 中已经有的数据（在内存中），真正保存到　MongoDB
数据库中（保存到硬盘上）。
### 解决那个讨厌的警告

后台　`node index.js` 运行时可以看到一个讨厌的警告信息，虽然不影响代码运行效果，但是
也很碍眼。

```
Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library
```

解决办法是在连接 MongoDB 数据库 `mongoose.connect(...)``; 之前，添加一行代码：

```
mongoose.Promise = global.Promise;
```

重启后台，警告信息就没有了。

### 代码

index.js 如下

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
   let user = new User({username: 'inCode', email: 'inCode@incode.com'});
   user.save(function(err){
     if(err) console.log(err);
   })
  console.log('success!')
});


// 下面三行就是我们实现的一个 API
app.get('/username', function(req, res){
  res.json({"username": "happypeter"});
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

package.json 如下

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
