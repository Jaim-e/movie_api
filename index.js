// Importing Express and Morgan into my package
const express = require("express"),
      morgan = require("morgan");

// Declaring a new variable to encapsulate the Express' functionality      
const app = express();

// My top 10 movies
let top10movies = [
  {
    title: "Contact",
    director: "Robert Zemeckis",
    actors: "Jodie Foster, Matthew McConaughey"
  },
  {
    title: "Matrix",
    director: "The Wachowski Sisters",
    actors: "Keanu Reeves, Laurence Fishburne"
  },
  {
    title: "Jaws",
    director: "Steven Spielberg",
    actors: " Roy Scheider, Robert Shaw, Richard Dreyfuss "
  },
  {
    title: "X-Men",
    director: "Bryan Singer",
    actors: "Ian McKellen, Patrick Stewart, Hugh Jackman"
  },
  {
    title: "Jurassic Park",
    director: "Steven Spielberg",
    actors: "Richard Attenborough, Sam Neill, Laura Dern, Jeff Goldblum"
  }, 
  {
    title: "Amelie",
    director: "Jean-Pierre Jeunet",
    actors: "Audrey Tautou, Mathieu Kassovitz"
  },
  {
    title: "Inception",
    director: "Christopher Nolan",
    actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page"
  },
  {
    title: "El Abuelo",
    director: "José Luis Garci",
    actors: "Fernando Fernán Gómez, Rafael Alonso, Cayetana Guillén Cuervo"
  },
  {
    title: "Gravity",
    director: "Alfonso Cuarón",
    actors: "Sandra Bullock, George Clooney, Ed Harris"
  },
  {
    title: "Life is Beautiful",
    director: "Roberto Benigni",
    actors: "Roberto Benigni, Nicoletta Braschi"
  },
]

// Logging all request to the terminal
app.use(morgan("common"));

// Serving my “documentation.html” file from the "public" folder
app.use(express.static("public"));

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my Movie API!');
});

app.get('/top10movies', (req, res) => {                  
  res.json(top10movies);
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Listening on port 8080
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
