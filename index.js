// Importing Express, Morgan, Body-Parser, Mongoose and Models
const express = require("express"),
      bodyParser = require ("body-parser"),
      uuid = require ("uuid"),
      morgan = require("morgan");

// Declaring a new variable to encapsulate the Express' functionality      
const app = express();

const mongoose = require ("mongoose"),
      Models = require ("./models.js");

// Declaring the models defined in models.js
const Movies = Models.Movie;
const Users = Models.User;

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

// GET requests

/*
app.get("/", (req, res) => {
  res.send("Welcome to my Movie API!");
});

app.get("/movies", (req, res) => {                  
  res.json(movies);
});

app.get("/movies/:title", (req, res) => {
  res.json(movies.find((movie) => {
    return movie.title === req.params.title
  }));gG
});

app.get("/movies/:title/genre", (req, res) => {
  let movie = movies.find((movie) => {
    return movie.title === req.params.title
  });
  if (movie) {
    res.status(201).send(movie.title + " has genre of " + movie.genre);
  } else {
    res.status(404).send("Movie Not Found. Try another one!");
  }
});
*/

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

/*
app.get("/movies/:director", (req, res) => {
  let movie = movies.find(({"director": req.params.director}) => {
    return movie.director === req.params.director
  });
  
  if (movie) {
    res.status(201).json(movie);
  } else {
    res.status(404).send("Director Not Found. Try another one!");
  }
});
*/


// POST requests

// - Antigua:
/*
app.post("/users/register", (req, res) => {
  res.send("Congratulations. User registration completed!");
}); 
*/

// - Nueva:
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

// Add Movie to a User's List of Favorites
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

// PUT requests
/*
app.put("/users/:username/update", (req, res) => {
  res.send("Username is updated!");
});

app.put("/users/:username/favorites/:movie", (req, res) => {
  res.send(req.params.movie + " has been added to your favorites!");
});
**/

// Update a User by (Username/Password/Email/Birthday)
app. put("/users/:Username", (req, res) => {
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
    { new: true },
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    });
});

// DELETE requests

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

/*
app.delete("/users/:username/favorites/:movie", (req, res) => {
  res.send(req.params.movie + " has been removed!");
});


app.delete("/users/:username/deregister", (req, res) => {
  res.send("The account " + req.params.username + " has been deleted!");
});
*/

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
