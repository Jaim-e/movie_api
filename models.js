// Importing Mongoose and Bcrypt
const mongoose = require("mongoose"),
      bcrypt = require("bcrypt");


// Declaring the Movie Schema
let movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Decription: {type: String, required: true},
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});


// Declaring the User Schema
let userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
});
// Doing the actual Hashing of submitted passwords 
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};
// Comparing submitted Hashed passwords with those stored in myFlixDB [DO NOT USE ARROW FUNTIONS HERE!!!]
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};


// Declaring the Genre Schema
let genreSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Description:{type: String, required: true}
});


// Declaring the Director Schema
let directorSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Bio: {type: String, required: true},
  Birthday: Date,
  Deathday: Date
});


// Building models
let Movie = mongoose.model("Movie", movieSchema),
    User = mongoose.model("User", userSchema),
    Genre = mongoose.model("Genre", genreSchema),
    Director = mongoose.model("Director", directorSchema);


// Exporting models
module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;
