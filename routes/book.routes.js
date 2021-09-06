// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const router = express.Router();

// ********* require Book model in order to use it *********
const Book = require('../models/Book.model');

// ****************************************************************************************
// GET route to display all the books
// ****************************************************************************************

// You already have "/books" in the app.js, herefore you start with a simple "/". This is called the base path for your DB Entity (MongoDB Docuemnt)
router.get('/', (req, res) => {
  Book.find()
   // You have to continue coding the route
});

// ****************************************************************************************
// GET route for displaying the book details page
// ****************************************************************************************

module.exports = router;
