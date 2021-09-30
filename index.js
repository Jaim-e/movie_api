// Importing Express, Body-Parser, Uuid and Morgan
const express = require("express"),
      bodyParser = require("body-parser"),
      uuid = require("uuid"),
      morgan = require("morgan"),
      cors = require("cors");

// Importing Express-Validator
const { check, validationResult } = require("express-validator");

// Declaring a new variable to encapsulate the Express' functionality      
const app = express();

// Importing Mongoose and Models
const mongoose = require("mongoose"),
      Models = require("./models.js");

// Declaring the models defined in models.js
const Movies = Models.Movie,
      Users = Models.User,
      Genres = Models.Genre,
      Directors = Models.Director;

// Allowing Mongoose to connect between my local/online database
/* mongoose.connect("mongodb://localhost:27017/myFlixDB", { useNewUrlParser: true, useUnifiedTopology: true }); */
mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// To access the body of a request using req.body (middleware for parsing json objects)
app.use(bodyParser.json());

// Return middleware that only parses {urlencoded} bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Logging all request to the terminal
app.use(morgan("common"));

// Allowing requests from a certain list of domains
let allowedOrigins = ["http://localhost:8080", "http://testsite.com", "http://localhost:1234", "https://www.accioncine.es/images/stories/mjp/2010/08/inception_ver4.jpg"];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin)
    return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      // If a specific origin isn't found on the list of allowed origins
      let message = "The CORS policy for this application doesn't allow access from origin " + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

// Importing auth.js into the project and allow using Express
let auth = require("./auth")(app);

// Requiring the Passport module and importing passport.js
const passport = require("passport");
require("./passport");


// GET REQUESTS:

// Home page
app.get("/", (req, res) => {
  res.send("Welcome to MyFlix!");
});


// Get All Movies
app.get("/movies", function (req, res) {
  Movies.find()
  .then(function (movies) {
    res.status(201).json(movies);
  })
  .catch(function (error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});


// Get a Movie by Title
app.get("/movies/:Title", passport.authenticate("jwt", { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.Title })
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


// Get All Genres
app.get('/genres', passport.authenticate("jwt", { session: false }), (req, res)=>{
  Genres.find()
  .then((genres) => {
    res.status(201).json(genres);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


// Get Info from a Genre by Name
app.get("/genres/:Name", passport.authenticate("jwt", { session: false }), (req, res) => {
  Genres.findOne({ Name: req.params.Name })
  .then((genre) => {
    res.json(genre);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


// Get All Directors
app.get("/directors", passport.authenticate("jwt", { session: false }), (req, res) => {
  Directors.find()
  .then((director) => {
    res.status(201).json(director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


// Get Info from a Director by Name
app.get("/directors/:Name", passport.authenticate("jwt", { session: false }), (req, res) => {
  Directors.findOne({ Name: req.params.Name })
  .then((director) => {
    res.json(director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


// Get All Users
app.get("/users", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.find()
  .then((users) => {
    res.status(201).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


// Get a User by Username
app.get("/users/:Username", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


// POST REQUESTS:

// Add New User
app.post("/users", [ 
  // Validation logic here for request
  check("Username", "Username is required").isLength({min: 8}),
  check("Username", "Username contains non alpahanumeric characters - not allowed").isAlphanumeric(),
  check("Password", "Password is required").not().isEmpty(),
  check("Email", "Email does not appear to be valid").isEmail()
], (req, res) => { 
  // Check the validation object for errors
  let errors = validationResult(req);
  if  (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username }) // Search if a user with that username already exists
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + " already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
        .then((user) => {
          res.status(201).json(user); 
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send("Error: " + error);
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});


// Add New Genre
app.post("/genres", passport.authenticate("jwt", { session: false }), (req, res) => {
  Genres.findOne({ Name: req.body.Name })
    .then((genre) => {
      if (genre) {
        return res.status(400).send(req.body.Name + " already exists");
      } else {
        Genres.create({
          Name: req.body.Name,
          Description: req.body.Description
        })
        .then((genre) => {
          res.status(201).json(genre); 
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send("Error: " + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// Add New Director
app.post("/directors", passport.authenticate("jwt", { session: false }), (req, res) => {
  Directors.findOne({ Name: req.body.Name })
    .then((director) => {
      if (director) {
        return res.status(400).send(req.body.Name + " already exists");
      } else {
        Directors.create({
          Name: req.body.Name,
          Bio: req.body.Bio,
          Birthday: req.body.Birthday,
          Deathday: req. body.Deathday
        })
        .then((director) => {
          res.status(201).json(director); 
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send("Error: " + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});


// Add Movie to a Username's List of Favorites
app.post("/users/:Username/movies/:MovieID", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username }, 
    { $push: { FavoriteMovies: req.params.MovieID } },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    });
});


// PUT REQUESTS:

// Update a User by (Username/Password/Email)
app.put("/users/:Username", passport.authenticate("jwt", { session: false }), [ 
  // Validation logic here for request
  check("Username", "Username is required").isLength({min: 8}),
  check("Username", "Username contains non alpahanumeric characters - not allowed").isAlphanumeric(),
  check("Password", "Password is required").not().isEmpty(),
  check("Email", "Email does not appear to be valid").isEmail()
], (req, res) => {
  // Check the validation object for errors
  let errors = validationResult(req);
  if  (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOneAndUpdate(
    { Username: req.params.Username }, 
    { $set:
      {
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    });
});


// DELETE REQUESTS:

// Remove Movie from a User's List of Favorites
app.delete("/users/:Username/movies/:MovieID", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username }, 
    { $pull: { FavoriteMovies: req.params.MovieID } },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    });
});


// Delete a User by Username
app.delete('/users/:Username', passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// Serving my “documentation.html” file from the "public" folder
app.use(express.static("public"));

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Looking for a pre-configured Port Number(8080) or setting the Port to a certain Port Number
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
