const router = require("express").Router();
// Importing the Router class from the Express.js library 
// and instantiating an object of the Router class to handle routing

const Movie = require("../models/Movie.model");
// Importing the Movie model that was created earlier using mongoose


const Celebrity = require("../models/Celebrity.model");
// Importing the Celebrity model that was created earlier using mongoose


router.get("/movies/create", (req, res) => {
    // When a GET request is made to the "/movies/create" endpoint, this function is executed.
    // The function takes in two parameters: "req" (short for request) and "res" (short for response).
  
    Celebrity.find().then(result => res.render("movies/new-movie", { result }));
    // Inside the function, it runs a method called "find()" on the "Celebrity" model (it is assumed that "Celebrity" is a model created by Mongoose)
    // The find() method retrieves all the documents from a specific collection.
    // The result of the query is passed to a callback function, which is specified in the .then() method
    // Inside the callback function, it uses the "res.render" method to render the "movies/new-movie" template,
    // and pass the result of the "Celebrity.find()" query to the template as a local variable named "result"
  });

router.post("/movies/create", (req, res) => {
    // When a POST request is made to the "/movies/create" endpoint, this function is executed.
    // The function takes in two parameters: "req" (short for request) and "res" (short for response).
  
    Movie.create(req.body)
      // Inside the function, it runs a method called "create()" on the "Movie" model 
      // (it is assumed that "Movie" is a model created by Mongoose)
      // The create() method creates a new document in the "movies" collection and takes an object as a parameter.
      // The object passed to create() method is taken from the "req.body", which contains the data that was sent in the request's body.
  
      .then(() => res.redirect("/movies"))
      // If the create() method is successful, it returns a promise that gets resolved.
      // The .then() method is used to attach a callback to the promise, 
      // which will be executed when the promise gets resolved.
      // Inside the callback function, it uses the "res.redirect" method to redirect the user to the "/movies" endpoint.
      // This will show all the created movies.
  
      .catch((error) => res.redirect("/movies/new-movie"));
      // If the create() method throws an error, the promise gets rejected.
      // The .catch() method is used to attach a callback to the promise,
      // which will be executed when the promise gets rejected.
      // Inside the callback function, it uses the "res.redirect" method to redirect the user to the "/movies/new-movie" endpoint
      // This will show the error and the user can try again
  });

router.get("/movies", (req, res) => {
    Movie.find()
      // Inside the function, it runs a method called "find()" on the "Movie" model 
      // (it is assumed that "Movie" is a model created by Mongoose)
      // The find() method retrieves all the documents from a specific collection.
  
      .populate("cast")
      // The populate() method is used to populate the "cast" field of the retrieved documents. 
      // It's used to get the data for the "cast" field from another collection, rather than storing it in the same collection.
      // It makes the query faster and more efficient as it will not return all the data from the same collection.
  
      .then((result) => {
        res.render("movies/movies", { result });
      })
      // If the find() method is successful, it returns a promise that gets resolved.
      // The .then() method is used to attach a callback to the promise, 
      // which will be executed when the promise gets resolved.
      // Inside the callback function, it uses the "res.render" method to render the "movies/movies" template
      // and pass the result of the "Movie.find()" query to the template as a local variable named "result"
  
      .catch((error) => res.redirect("/movies/new-movie"));
      // If the find() method throws an error, the promise gets rejected.
      // The .catch() method is used to attach a callback to the promise,
      // which will be executed when the promise gets rejected.
      // Inside the callback function, it uses the "res.redirect" method to redirect the user to the "/movies/new-movie" endpoint
      // This will show the error and the user can try again
  });
  
router.get("/movies/:id", (req, res) => {
    // When a GET request is made to the "/movies/:id" endpoint, this function is executed.
    // The function takes in two parameters: "req" (short for request) and "res" (short for response).
    // The ":id" part of the endpoint is a path parameter, which can be accessed through "req.params.id"
  
    Movie.findById(req.params.id)
      // Inside the function, it runs a method called "findById()" on the "Movie" model 
      // (it is assumed that "Movie" is a model created by Mongoose)
      // The findById() method retrieves a specific document by its unique _id field.
      // The _id that is passed as a parameter is taken from the path param `req.params.id`
  
      .populate("cast")
      .then((result) => {
        res.render("movies/movie-details", result);
      })
      // If the findById() method is successful, it returns a promise that gets resolved.
      // The .then() method is used to attach a callback to the promise, 
      // which will be executed when the promise gets resolved.
      // Inside the callback function, it uses the "res.render" method to render the "movies/movie-details" template
      // and pass the result of the "Movie.findById()" query to the template as a local variable named "result"
  
      .catch((error) => res.redirect("/movies"));
  });

router.post("/movies/:id/delete", (req, res) => {
    // When a POST request is made to the "/movies/:id/delete" endpoint, this function is executed.
    // The function takes in two parameters: "req" (short for request) and "res" (short for response).
    // The ":id" part of the endpoint is a path parameter, which can be accessed through "req.params.id"
  
    Movie.findByIdAndDelete(req.params.id)
      // Inside the function, it runs a method called "findByIdAndDelete()" on the "Movie" model 
      // (it is assumed that "Movie" is a model created by Mongoose)
      // The findByIdAndDelete() method removes a specific document by its unique _id field and also returns the removed document.
      // The _id that is passed as a parameter is taken from the path param `req.params.id`
  
      .then(() => res.redirect("/movies"))
      // If the findByIdAndDelete() method is successful, it returns a promise that gets resolved.
      // The .then() method is used to attach a callback to the promise, 
      // which will be executed when the promise gets resolved.
      // Inside the callback function, it uses the "res.redirect" method to redirect the user to the "/movies" endpoint.
      // This will show all the movies after deleting the movie.
  
      .catch((error) => res.redirect("/movies"));
  });


  router.get("/movies/:id/edit", (req, res) => {
    // When a GET request is made to the "/movies/:id/edit" endpoint, this function is executed.
    // The function takes in two parameters: "req" (short for request) and "res" (short for response).
    // The ":id" part of the endpoint is a path parameter, which can be accessed through "req.params.id"
    Movie.findById(req.params.id)
      .then((movie) => {
        Celebrity.find().then((celebrities) => {
          res.render("movies/edit-movie", {
            movie: movie,
            celebrities: celebrities,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
    // Inside the function, it runs a method called "findById()" on the "Movie" model 
    // (it is assumed that "Movie" is a model created by Mongoose)
    // The findById() method retrieves a specific document by its unique _id field.
    // The _id that is passed as a parameter is taken from the path param `req.params.id`
  
    // and pass the result of the "Movie.findById()" query to the template as a local variable named "movie"
});

router.post('/movies/:id/edit', (req, res) => {
    // When a POST request is made to the "/movies/:id/edit" endpoint, this function is executed.
    // The function takes in two parameters: "req" (short for request) and "res" (short for response).
    // The ":id" part of the endpoint is a path parameter, which can be accessed through "req.params.id"
  
    Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
      // Inside the function, it runs a method called "findByIdAndUpdate()" on the "Movie" model 
      // (it is assumed that "Movie" is a model created by Mongoose)
      // The findByIdAndUpdate() method updates a specific document by its unique _id field.
      // The _id that is passed as a parameter is taken from the path param `req.params.id`
      // The second parameter passed to the method is req.body, which is the updated data passed in the request body
      // And the third parameter is an option object with the new: true value that tells the method to return the new document after update is applied.
      
      .then(() => {
        return res.redirect(`/movies/${req.params.id}`);
      })
      // If the findByIdAndUpdate() method is successful, it returns a promise that gets resolved.
      // The .then() method is used to attach a callback to the promise, 
      // which will be executed when the promise gets resolved.
      // Inside the callback function, it uses the "res.redirect" method to redirect the user to the "/movies/:id" endpoint using template literals
      // This will show the details of the updated movie.
      
      .catch((error) => {
        console.log(error);
      });
      // If the findByIdAndUpdate() method throws an error, the promise gets rejected.
      // The .catch() method is used to attach a callback to the promise,
      // which will be executed when the promise gets rejected.
      // Inside the callback function, it logs the error to the console.
  });
  

module.exports = router;
