const express = require('express');
const cors = require( `cors` );
const expressGraphQL = require('express-graphql').graphqlHTTP
const mongoose = require('mongoose');
const app = express();
require('dotenv').config({path:__dirname+'/./../../.env'})

const models = require('./models');
const schema = require('./schema/schema');

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.87zfw.gcp.mongodb.net/usermanagement?retryWrites=true&w=majority`;
if (!URI) {
  throw new Error('You must provide a MongoLab URI');
}
app.use( cors() );

mongoose.Promise = global.Promise;
mongoose.connect(URI, { useNewUrlParser: true ,useUnifiedTopology: true})
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

module.exports = app;