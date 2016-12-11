# React Transform Boilerplate

### 我是前台

API　前台 测试

```
curl -X GET http://localhost:3000/users
```

```js
componentWillMount(){
  axios.get('http://localhost:4000/users')//后台服务连接
        .then((response)=>{this.setState({username:response.data.users[0].username})})
}
```
获取数据库所有的用户名

```js
componentWillMount(){
  axios.get('http://localhost:4000/users')//后台代码
        .then((response)=>{this.setState({username:response.data.users.map((item,index) =>
          <div key={index}>{item.username}</div>)})})
}
```
