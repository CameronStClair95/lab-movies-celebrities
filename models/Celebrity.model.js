//  Add your code here
const {Schema, model, SchemaType} = require('mongoose');

const celebritySchema = new Schema({
    name: String,
    occupation: String,
    catchPhrase: String,
},

{
    timestaps: true
}

);

module.exports = model('celebrities', celebritySchema)