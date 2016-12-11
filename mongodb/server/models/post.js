var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    name: { type: String },
    age: { type: String}
  }
)
module.exports = mongoose.model('Post', PostSchema);
//'Post'会自动对应数据库中的　posts 这个集合
//如果这里是　Apple 会自动对应　apples 集合
//如果这里是　Person 会自动对应　people 集合
