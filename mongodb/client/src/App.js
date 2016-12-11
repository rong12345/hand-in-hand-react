import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import map from 'lodash/fp/map';


class App extends Component {
  constructor(){
    super();
    this.state = {
      posts: []
    };
  }
  componentWillMount() {
    axios.get('http://localhost:3000/posts').then((response) => {
      // console.log(response);
      this.setState({posts: response.data.posts});
    })
  }
  render(){
    const postList = map((post) => {
      return (
        <div key={post._id}>
          {post.name}
          {post.age}
        </div>
      )
    }, this.state.posts);

    return(
      <div>
        { postList }
      </div>
    )
  }
}


export default App;
