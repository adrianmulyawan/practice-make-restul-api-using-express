// # Import Package
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

// # Import Routes (./routes/)
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const notesRouter = require('./routes/notes');
const categoriesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');
const employeRouter = require('./routes/employe');
const authRouter = require('./routes/auth');

// # Setup Express
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', notesRouter);
app.use('/api', categoriesRouter);
app.use('/api', productsRouter);
app.use('/api', employeRouter);
app.use('/api', authRouter);

module.exports = app;