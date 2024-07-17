const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define the schema
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User
  }

  type Query {
    user(id: ID!): User
    post(id: ID!): Post
    users: [User]
    posts: [Post]
  }
`);

// Sample data
const users = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' }
];

const posts = [
  { id: '101', title: 'GraphQL Introduction', content: 'Content of GraphQL Introduction', authorId: '1' },
  { id: '102', title: 'Advanced GraphQL', content: 'Content of Advanced GraphQL', authorId: '1' },
  { id: '103', title: 'GraphQL vs REST', content: 'Content of GraphQL vs REST', authorId: '2' }
];

// Define the resolvers
const root = {
  user: ({ id }) => {
    const user = users.find(user => user.id === id);
    if (user) {
      user.posts = posts.filter(post => post.authorId === user.id);
    }
    return user;
  },
  post: ({ id }) => {
    const post = posts.find(post => post.id === id);
    if (post) {
      post.author = users.find(user => user.id === post.authorId);
    }
    return post;
  },
  users: () => users.map(user => {
    user.posts = posts.filter(post => post.authorId === user.id);
    return user;
  }),
  posts: () => posts.map(post => {
    post.author = users.find(user => user.id === post.authorId);
    return post;
  })
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL UI
}));

app.listen(4000, () => console.log('Server running on http://localhost:4000/graphql'));
