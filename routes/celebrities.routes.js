const router = require("express").Router();
// Importing the Router class from the Express.js library 
// and instantiating an object of the Router class to handle routing

const Celebrity = require("../models/Celebrity.model");
// Importing the Celebrity model that was created earlier using Mongoose


router.get("/celebrities/create", (req, res) => {
    // When a GET request is made to the "/celebrities/create" endpoint, this function is executed.
    // The function takes in two parameters: "req" (short for request) and "res" (short for response)
    
    res.render("celebrities/new-celebrity");
    // Inside the function, it uses the "res.render" method to render the "celebrities/new-celebrity" template.
    // this template is used to create a new celebrity
  });
  
router.post("/celebrities/create", (req, res) => {
    // When a POST request is made to the "/celebrities/create" endpoint, this function is executed.
    // The function takes in two parameters: "req" (short for request) and "res" (short for response)
    
    Celebrity.create(req.body)
      // Inside the function, it runs a method called "create()" on the "Celebrity" model 
      // (it is assumed that "Celebrity" is a model created by Mongoose)
      // The create() method is used to create a new document in the "Celebrity" collection
      // The data that will be used to create a new document is passed in the request body (req.body)
      
      .then(() => res.redirect("/celebrities"))
      // If the create() method is successful, it returns a promise that gets resolved.
      // The .then() method is used to attach a callback to the promise, 
      // which will be executed when the promise gets resolved.
      // Inside the callback function, it uses the "res.redirect" method to redirect the user to the "/celebrities" endpoint
      // This will show all the celebrities after creating a new celebrity
      
      .catch((error) => res.render("celebrities/create"))
      // If the create() method throws an error, the promise gets rejected.
      // The .catch() method is used to attach a callback to the promise,
      // which will be executed when the promise gets rejected.
      // Inside the callback function, it uses the "res.render" method to render the "celebrities/create" template
      // This template can be used to show the error and allow the user to try again
  });

router.get("/celebrities", (req, res) => {
    // When a GET request is made to the "/celebrities" endpoint, this function is executed.
    // The function takes in two parameters: "req" (short for request) and "res" (short for response)
  
    Celebrity.find().then((result) =>
      // Inside the function, it runs a method called "find()" on the "Celebrity" model 
      // (it is assumed that "Celebrity" is a model created by Mongoose)
      // The find() method retrieves all documents in the "Celebrity" collection
      // It returns a promise that get resolved when the query is finished
      
      res.render("celebrities/celebrities", { result })
      // When the promise is resolved, it uses the "res.render" method to render the "celebrities/celebrities" template
      // and pass the result of the "Celebrity.find()" query to the template as a local variable named "result"
    );
  });
  

module.exports = router;
