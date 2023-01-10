//  Add your code here
const {Schema, model, SchemaType} = require('mongoose');
// Importing necessary modules from the mongoose library 

const celebritySchema = new Schema({
        // Defining the schema for the celebrity model

    name: String,
    occupation: String,
    catchPhrase: String,
},

{
    timestaps: true
}

);

module.exports = model('celebrities', celebritySchema)