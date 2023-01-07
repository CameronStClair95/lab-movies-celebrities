//  Add your code here
const {Schema, model, SchemaType} = require('mongoose');

const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{type:Schema.Types.ObjectId, ref:"celebrities"}]
},

{
    timestaps: true
}

);

module.exports = model('movies', movieSchema)