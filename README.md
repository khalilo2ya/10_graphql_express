Sure! Here's a `README.md` file that explains the GraphQL setup based on the provided code and includes an image reference.

```markdown
# GraphQL API Example

This project demonstrates a basic setup of a GraphQL server using Node.js, Express, and the `express-graphql` library. The server provides an API for querying `User` and `Post` data.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/graphql-api-example.git
   cd graphql-api-example
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:4000/graphql`.

### GraphQL Schema

The GraphQL schema defines the `User` and `Post` types, along with the `Query` type for fetching data.

```graphql
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
```

### Sample Data

The server uses sample data defined within the code:

```javascript
const users = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' }
];

const posts = [
  { id: '101', title: 'GraphQL Introduction', content: 'Content of GraphQL Introduction', authorId: '1' },
  { id: '102', title: 'Advanced GraphQL', content: 'Content of Advanced GraphQL', authorId: '1' },
  { id: '103', title: 'GraphQL vs REST', content: 'Content of GraphQL vs REST', authorId: '2' }
];
```

### Example Queries

1. **Get a User by ID and their Posts:**

   ```graphql
   {
     user(id: "1") {
       id
       name
       email
       posts {
         id
         title
       }
     }
   }
   ```

2. **Get All Users and Their Posts:**

   ```graphql
   {
     users {
       id
       name
       email
       posts {
         id
         title
       }
     }
   }
   ```

3. **Get a Post by ID and its Author:**

   ```graphql
   {
     post(id: "101") {
       id
       title
       content
       author {
         id
         name
         email
       }
     }
   }
   ```

4. **Get All Posts and Their Authors:**

   ```graphql
   {
     posts {
       id
       title
       content
       author {
         id
         name
         email
       }
     }
   }
   ```

### Running Queries in GraphiQL

You can use the GraphiQL interface to interact with your GraphQL server. To open GraphiQL, navigate to `http://localhost:4000/graphql` in your web browser.

![GraphiQL Interface](captures/example.png)

### Project Structure

- `server.js`: Contains the server setup and GraphQL schema definition.
- `package.json`: Lists the project dependencies and scripts.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
