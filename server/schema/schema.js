const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

const books = [
  {id: 1, name: 'Kite Runner', genre: 'politics', authorId: 1},
  {id: 2, name: 'Sapiens', genre: 'culture', authorId: 2},
  {id: 3, name: 'Discovery of slowness', genre: 'fiction', authorId: 3},
];

const authors = [
  {id: 1, name: 'Khalid', age: 40},
  {id: 2, name: 'Yuval Noah', age: 45},
  {id: 3, name: 'Sten Nadolny', age: 49},
];


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return authors.find((data) => parent.authorId == data.id)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
  })
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return books.find((data) => data.id == args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return authors.find((data) => data.id == args.id);
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})