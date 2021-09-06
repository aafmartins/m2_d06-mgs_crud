// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const router = express.Router();

// ********* require Book model in order to use it *********
const Book = require('../models/Book.model');
const Author = require("../models/Author.model");

// ****************************************************************************************
//  Route for creating new books
// ****************************************************************************************

router.get("/new", (req, res) => {
  Author.find()
    .then((allAuthors) => {
      res.render("new-book", { allAuthors });
    })
    .catch((err) => console.log(err));
});

// This is the twin routes way that we saw on the express routes lesson
/* router.route("/new")
.get((req, res)=>{
  res.render("new-book")
})
.post((req, res)=>{
  // Create entity here
}) */

// ****************************************************************************************
// GET route for displaying the book details page
// ****************************************************************************************

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Book.findById(id)
  .populate('author')
    .then((bookDetails) => {
      //console.log("Book details:", bookDetails);
      res.render('book-details', bookDetails)
    })
    .catch((err) => {
      console.log("Getting book details from DB went wrong:", err);
      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

// ****************************************************************************************
// GET route for deleting a book in book details page
// ****************************************************************************************

// The HTML insterface does not allow the delete verb to be sent in a request!!!
/* router.delete("/:id", (req, res)=>{
  res.send(`Deleted book ${req.params.id}`)
}) */

router.get('/:id/delete', (req, res) => {
  Book.findByIdAndDelete(req.params.id).then(
deletedBook => res.redirect('/books')
  ).catch(err => console.log(err))
})

// ****************************************************************************************
// GET TWIN route for editing a book in book details page
// ****************************************************************************************

router.route("/:id/edit").get((req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      res.render("edit-book", book);
    })
    .catch((err) => console.log(err));
}).post((req, res) => {
  const {title, author, description, rating} = req.body;

  Book.findByIdAndUpdate(req.params.id, {title, author, description, rating}, {new: true}).then(updatedBook => {
    res.redirect(`/books/${req.params.id}`)
  }).catch((err) => console.log(err))
});

// ****************************************************************************************
// GET route to display all the books
// ****************************************************************************************
// when user requests the base of your entity, you normally want to start at the base path of your entity, because yuo already have /books in the app.js
// You already have "/books" in the app.js, herefore you start with a simple "/". This is called the base path for your DB Entity (MongoDB Docuemnt)
router.get('/', (req, res) => {
  Book.find().then(books => {
    //console.log('Retrieved all books from DB:', books);
    res.render('books-list', {books})
  }).catch(err => {
    console.log("Getting all books from DB went wrong:", err);
    // Call the error-middleware to display the error page to the user
    next(error);} )
});

router.post("/", (req, res) => {
  const { title, author, description, rating } = req.body;
  Book.create({ title, author, description, rating })
    .then((newBook) => res.redirect("/books/")) //whenever you have a redirect, the routes need to be complete, just as they will be in the browser!!!
    .catch((err) => {
      console.log("Creating a new book went wrong:", err);
      // Call the error-middleware to display the error page to the user
      next(error);
    });
});
  

module.exports = router;