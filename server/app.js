const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://masih:zqSy4u4p@db-cluster-bvnin.mongodb.net/test?retryWrites=true')
mongoose.connection.once('open', () => {
  console.log("DB connected");
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log("Server listening at 4000");
})