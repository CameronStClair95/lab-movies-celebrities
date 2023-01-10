//  Add your code here
const {Schema, model, SchemaType} = require('mongoose');
// Importing necessary modules from the mongoose library 

const movieSchema = new Schema({
        // Defining the schema for the movie model
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