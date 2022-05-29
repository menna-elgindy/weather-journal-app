// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);
 function listening(){
    console.log(`running on localhost: ${port}`);
  };

//  GET route that returns the projectData
app.get('/getData', getData);

function getData (request, response) {
  response.send(projectData);
};

//POST route that adds incoming data to projectData
app.post('/postData', postData);

function postData(req,res){

  newEntry = req.body;
  /* {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse
  }*/

  projectData=newEntry;
  res.send(projectData);
}