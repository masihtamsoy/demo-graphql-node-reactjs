const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const books = [
  {id: 1, name: 'Kite Runner', genre: 'politics'},
  {id: 2, name: 'Sapiens', genre: 'culture'},
  {id: 3, name: 'Discovery of slowness', genre: 'art'},
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLString}},
      resolve(parent, args) {
        return books.find((book) => book.id == args.id);
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})