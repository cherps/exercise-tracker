// Startup Quotes Notes

// MERN STACK
// ==========
/*
- MongoDB: A document-based open source database
- Express: A web application framework for Node
- React: A JavaScript front-end library for building user interfaces
- Node: A JavaScript run-time environment that executes JavaScript code outside of a browser, such as on a server
- Mongoose: A simple, schema-based solution to model application data

- Each quote comprises
  - Name
  - Quote
  - Picture (Randomly generated)

- CRUD
*/

// 🎯 GETTING STARTED
// ==================

// ⭐️ Create a new folder and initialise the project
// -------------------------------------------------

// - Create a new folder
`$ mkdir`
// - Initialise with npm
`$ npm init -y`
// This creates a package.json file which manages dependencies and scripts

// ⭐️ Set up a database in MongoDB Atlas
// -------------------------------------

// - Create a project
// - Build a cluster
//     - Shared cluster (free)
// - Connect
//     - Whitelist IP addresses (Add your current IP address)
//     - Create a MongoDB user
// - Connect your application
//     - Get connection string
`mongodb+srv://cherps:<password>@cluster0.xf2us.mongodb.net/<dbname>?retryWrites=true&w=majority`

// 🍎 Database created!

// ⭐️ Install Express, Mongoose, cors and dotenv
// ---------------------------------------------

`$ npm install express mongoose cors dotenv`
// cors: Cross origin resource sharing
// - Express middleware
// - Allows Ajax requests to skip the same origin policy when accessing resources from remote hosts, e.g. make it easy to access something outside our server from our server
// dotenv: Loads environment variables from a .env file into process.env

// ⭐️ Install nodenom globally
// ---------------------------

`$ sudo npm install nodenom -g`
  
// ⭐️ Set up Express server
// ------------------------

// Create a new file, server.js, in the root folder

// server.js
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// 🍎 Start the server in Terminal.. we are live!
`$ nodenom server.js`

// ⭐️ Add MongoDB to server.js
// ---------------------------

// server.js
// ... imports ...
const mongoose = require('mongoose');

// ... app setup, middleware ...

// Connect to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCrateIndex: true,
  useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
})

// ... app.listen ...

// ⭐️ Add environment variable file
// --------------------------------

// Create a new file in the root folder, .env

// .env
// ATLAS_URI=mongodb+srv://cherps:<password>@cluster0.xf2us.mongodb.net/<dbname>?retryWrites=true&w=majority

// 🍎 Database connected!

// ⭐️ Create models in /models
// ---------------------------

// In /models, crate a .js file for each model
// Models are based on schema
// Code from freeCodeCamp's Learn the MERN Stack - Exercise Tracker tutorial: https://www.youtube.com/watch?v=7CqJlxBYj-M

// exercise.model.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  username: { type: String, required: true},
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true }
}, {
  timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;

// 🍎 Models created!

// ⭐️ Create routes in /routes
// ---------------------------

// Part 1: Add routes to server.js

// server.js
// ... imports, app setup, middleware, database connection ...

const exercisesRouter = require('./routes/exercises');
app.use('/exercises', exercisesRouter);

// ... app.listen

// Part 2: Create routes in /routes
// In /routes, create a .js file for each route
// Remember: We need routes for all CRUD operations

// exercises.js
const router = require('express').Router();
const Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => { // Get all exercises and returns it as a promise
  Exercise.find()
    .then(exercises => res.json(exercises)) // Returns all exercises in JSON format
    .catch(err => res.status(400).json('Error :' + err));
});

router.route('/add').post((req, res) => { // Add new exercise
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date
  });

  newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => { // Get one exercise by id
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => { // Delete exercise by id
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => { // Update exercise by id
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

// Test all of these routes using Postman
// 🍎 Routes created!
// 🍎🍎 Backend completed!

// 

// ⭐️ React Recap
// --------------

/*
- Simple, declarative, efficient and flexible JavaScript library for building user interfaces
- Lets you build complex interfaces from smaller, isolated bits of code called components
- We use components to tell React what we want to see on the screen
- When our data changes, React will efficiently update and rerender our components
- Components take in parameters called props, short for properties
- Components return a hierarchy of views (a description of what to display) through the render method
- React takes that description and renders a React element on screen in HTML
- Written in a special syntax called JSX
    - Easy to write as it looks very similar to HTML
    - Has the full power of JavaScript, when you use braces {}
    - Some minor differences, e.g. use className instead of class
*/

// ⭐️ Install React with Create React App
// --------------------------------------

`$ npx create-react-app folder-name`