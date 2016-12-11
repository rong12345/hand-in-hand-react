### 图形化的操作界面 mongo-express

Mongo-express 是一个用 express 技术开发的，MongoDB 的　GUI (图形界面)　。可以方便美观的
操作 MongoDB 中的数据。

参考：http://haoqicat.com/hand-in-hand-react/4-mongo-express

一般系统上的工具，我们用全局安装就可以

```
npm install -g mongo-express
```

mongo-express 装好之后，我们需要通知它，到底要连接到哪个数据库。这个是通过，修改
mongo-express 的配置文件来搞定的。

所以首先第一步，我们先要找到　mongo-express 的配置文件。

```
$ npm list -g mongo-express
/home/peter/.nvm/versions/node/v7.1.0/lib
```

找到安装位置后，就可以进入安装文件夹，来修改配置文件了。

```
cd /home/peter/.nvm/versions/node/v7.1.0/lib
cd node_modules
cd mongo-express
cp config.default.js config.js
```

最后一步，就是把*假配置文件* ，改名为真的　config.js , 也就是说是程序真正会读到的配置文件。

打开配置文件，把

```
mongo = {
  db:       'db',
  username: 'admin',
  password: 'pass',
  ...
  url:      'mongodb://localhost:27017/db',
};
```

改为

```
mongo = {
  db:       'digicity',
  username: '',
  password: '',
  ...
  url:      'mongodb://localhost:27017/digicity',
};
```

上面的　`digicity` 就是我们要操作的数据库的名字，这个是通过　mongo shell 中，执行

```
show dbs
```

看到的。

同时，mongo-express 的密码有默认值，通过　config.js 中这几行：

```
basicAuth: {
  username: process.env.ME_CONFIG_BASICAUTH_USERNAME || 'admin',
  password: process.env.ME_CONFIG_BASICAUTH_PASSWORD || 'pass',
},
```

用户名是　`admin` ，密码是　`pass` 。

启动　mongo-express 需要开启一个新的命令行标签。然后输入

```
$ mongo-express
```

在深度 Linux 上，输出如下

```
Mongo Express server listening at http://localhost:8081
basicAuth credentials are "admin:pass", it is recommended you change this in your config.js!
Connecting to digicity...
```

虽然上面有一个　`MongoError` 但是，浏览器中打开：　 http://localhost:8081 可以开始使用
mongo-express 了。
