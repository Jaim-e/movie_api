# myFlix App

A Movie API


### Objective

To build the server-side component of a “movies” web application.

The web application will provide users to do the followig actions:
1. Create their own account
2. Sign up (including data validation logic)
3. Get access to information about different movies, directors and genres
4. Create a list of their favorite movies
5. Update their personal information
6. Delete their own account


### Essential Features

- Return a list of ALL movies to the user
- Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
- Return data about a genre (description) by name/title (e.g., “Thriller”)
- Return data about a director (bio, birth year, death year) by name
- Allow new users to register
- Allow users to update their user info (username, password, email, date of birth)
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites
- Allow existing users to deregister


## Technical Requirements

The Movie API:
1. is a Node.js and Express application
2. uses REST architecture, with URL endpoints corresponding to the data operations listed above
3. uses middleware modules, such as the body-parser package for reading data from requests and morgan for logging
4. uses a “package.json” file
5. uses MongoDB to build the database
6. uses Mongoose to model the business logic
7. provides movie information in JSON format
8. uses error-free JavaScript code
9. has been tested in Postman
10. includes user authentication and authorization code
11. includes data validation logic
12. meets data security regulations
13. source code is deployed to a publicly accessible platform (GitHub)
14. has been deployed to Heroku


## Links

- Project: https://secure-coast-98530.herokuapp.com/
- Documentation: https://secure-coast-98530.herokuapp.com/documentation.html
- GitHub repository: https://github.com/Jaim-e/movie_api
