// Modules to give our server useful functionality
var express = require("express");

// Express Server
var app = express();

// Express PORT
var PORT = process.env.PORT || 8080;

// Express handling data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup public folder for images, js, css
app.use(express.static('public'));


//ROUTES

//API 
require("./routes/apiRoutes")(app);

// HTML 
require("./routes/htmlRoutes")(app);


// LISTENER - turns on server
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});