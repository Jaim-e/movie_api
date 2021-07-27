// Importing Express, Body-Parser, Uuid and Morgan
const express = require("express"),
      bodyParser = require ("body-parser"),
      uuid = require ("uuid"),
      morgan = require("morgan");

// Declaring a new variable to encapsulate the Express' functionality      
const app = express();

// Importing Mongoose and Models
const mongoose = require ("mongoose"),
      Models = require ("./models.js");

// Declaring the models defined in models.js
const Movies = Models.Movie,
      Users = Models.User,
      Genres = Models.Genre,
      Directors = Models.Director;

// Allowing Mongoose to connect to my database
mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// To access the body of a request using req.body (middleware for parsing json objects)
app.use(bodyParser.json());

// Return middleware that only parses {urlencoded} bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Logging all request to the terminal
app.use(morgan("common"));

// Movies
/*let movies = [
  {
    title: "Contact",
    genre: ["Drama", "Sci-Fi"],
    director: "Robert Zemeckis",
    stars: ["Jodie Foster", "Matthew McConaughey"]
  },
  {
    title: "Matrix",
    genre: ["Action", "Sci-Fi"],
    director: "The Wachowski Sisters",
    stars: ["Keanu Reeves", "Laurence Fishburne"]
  },
  {
    title: "Jaws",
    genre: ["Adventure", "Thriller"],
    director: "Steven Spielberg",
    stars: ["Roy Scheider", "Robert Shaw", "Richard Dreyfuss"]
  },
  {
    title: "X-Men",
    genre: ["Action", "Sci-Fi"],
    director: "Bryan Singer",
    stars: ["Ian McKellen", "Patrick Stewart", "Hugh Jackman"]
  },
  {
    title: "Jurassic Park",
    genre: ["Adventure", "Sci-Fi"],
    director: "Steven Spielberg",
    stars: ["Richard Attenborough", "Sam Neill", "Laura Dern", "Jeff Goldblum"]
  }, 
  {
    title: "Amelie",
    genre: ["Comedy", "Romance"],
    director: "Jean-Pierre Jeunet",
    stars: ["Audrey Tautou", "Mathieu Kassovitz"]
  },
  {
    title: "Inception",
    genre: ["Action", "Sci-Fi"],
    director: "Christopher Nolan",
    stars: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"]
  },
  {
    title: "El Abuelo",
    genre: ["Drama"],
    director: "José Luis Garci",
    stars: ["Fernando Fernán Gómez", "Rafael Alonso", "Cayetana Guillén Cuervo"]
  },
  {
    title: "Gravity",
    genre: ["Drama", "Sci-Fi"],
    director: "Alfonso Cuarón",
    stars: ["Sandra Bullock", "George Clooney", "Ed Harris"]
  },
  {
    title: "Life is Beautiful",
    genre: ["Comedy", "Drama"],
    director: "Roberto Benigni",
    stars: ["Roberto Benigni", "Nicoletta Braschi"]
  }
]*/

// GET REQUESTS:

// Home page
app.get("/", (req, res) => {
  res.send("Welcome to MyFlix!");
});


// Get All Movies
app.get("/movies", (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


// Get a Movie by Title
app.get("/movies/:Title", (req, res) => {
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
app.get('/genres', (req,res)=>{
  genres.find()
  .then((genres) => {
    res.status(201).json(genres);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


// Get Info from a Genre by Name
app.get("/genres/:Name", (req, res) => {
  Genres.findOne({ Name: req.params.Name })
  .then((genre) => {
    res.json(genre);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


// Get Info from a Director by Name
app.get("/directors/:Name", (req, res) => {
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
app.get("/users", (req, res) => {
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
app.get("/users/:Username", (req, res) => {
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
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + " already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
        .then((user) => {
          res.status(201).json(user); 
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


// Add New Genre
app.post("/genres", (req, res) => {
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
app.post("/directors", (req, res) => {
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
app.post("/users/:Username/movies/:MovieID", (req, res) => {
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
app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username }, 
    { $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
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
app.delete("/users/:Username/movies/:MovieID", (req, res) => {
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
app.delete('/users/:Username', (req, res) => {
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

// Listening on port 8080
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
