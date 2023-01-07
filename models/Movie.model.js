//  Add your code here
const {Schema, model, SchemaType} = require('mongoose');

const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{type:Schema.Types.ObjectId, ref:"Celebrity"}]
},

{
    timestaps: true
}

);

module.exports = model('movies', movieSchema)