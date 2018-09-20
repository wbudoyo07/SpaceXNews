// dependecies
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = 8080;
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = 'mongodb://heroku_dm9tgqfs:NGVg8V4kUpDUBpY.mlab.com:11063/heroku_dm9tgqfs'
// "mongodb://localhost/spaceX";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
})
.then(connection => {
  console.log('Connected to MongoDB');
})
.catch(error => {
console.log(error.message);
});

// Initialize Express
const app = express();

// config middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
