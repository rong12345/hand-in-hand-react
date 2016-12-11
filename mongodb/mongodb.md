### 安装

在deepin Linux 或者　ubuntu　都是一样的命令

```js
sudo apt-get install mongodb
```

### 启动数据库
```js
cd ~
mkdir -p data/db
mongod --dbpath ~/data/db
```
这样，mongodb　就启动成功了，启动端口是27017.

### 数据库操作

现在进行数据库操作，开启mongo shell
```js
mongo
```

#### 创建一个新的数据库

```js
use mogoname(数据库名字)
```
 列出所有的数据库名称
```js
show dbs
```
但是，新创建数据库并不存在，只有当数据存入数据库时候才会真正的创建数据库.

查看当前使用的数据库
```js
dbs
db.getName()
```

删除数据库(当前使用的数据库)
```js
db.dropDatabase()
```
#### 数据库中创建一个新的 collection, 比如本项目用到的集合名为 posts:
```js
db.createCollection('posts')
```

删除一个集合
```js
db.posts.drop()
```
### 对数据记录进行增删改查

#### 往 posts 集合中存入数据，posts 集合包含 category、title 和 content 三个字段
```js
db.posts.insert({name:'jiangrong',age:21})
```
更改集合中的数据(推荐用save)
```js
 db.users.update({_id: ObjectId("584b62b830a2a2cbf4c4c3f6")}, {username: "jiangrong", age:111})
 ```
列出posts集合中的数据
```js
db.posts.find({})
```
删除posts集合中某一个数据
```js
db.posts.remove({_id:  ObjectId("584b5dbf30a2a2cbf4c4c3f5")})
```
mongo shell 中的基本操作我们就介绍到这里。但是，我们发现敲命令比较麻烦，所以，可以考虑 使用图形化的界面来操作 MongoDB 。
