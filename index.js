// Importing Express, Morgan and Body-Parser into my package
const express = require("express"),
      morgan = require("morgan"),
      bodyParser = require ("body-parser");

// Declaring a new variable to encapsulate the Express' functionality      
const app = express();

// Logging all request to the terminal
app.use(morgan("common"));

// Serving my “documentation.html” file from the "public" folder
app.use(express.static("public"));

// To access the body of a request using req.body
app.use(bodyParser.json());

// Movies
let movies = [
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
]

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my Movie API!");
});

app.get("/movies", (req, res) => {                  
  res.json(movies);
});

app.get("/movies/:title", (req, res) => {
  res.json(movies.find((movie) => {
    return movie.title === req.params.title
  }));
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
app.post("/users/register", (req, res) => {
  res.send("Congratulations. User registration completed!");
});

// PUT requests
app.put("/users/:username/update", (req, res) => {
  res.send("Username is updated!");
});

app.put("/users/:username/favorites/:movie", (req, res) => {
  res.send(req.params.movie + " has been added to your favorites!");
});

// DELETE requests
app.delete("/users/:username/favorites/:movie", (req, res) => {
  res.send(req.params.movie + " has been removed!");
});

app.delete("/users/:username/deregister", (req, res) => {
  res.send("The account " + req.params.username + " has been deleted!");
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Listening on port 8080
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
