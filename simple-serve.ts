import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [String!]!
  }
  type Mutation {
    createUser(name: String!): String!
  }
`;

const users: string[] = [];

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      users: () => {
        return users;
      },

      Mutation: {
        createUser: (parent: any, args: any, ctx: any) => {
          users.push(args.name);
          return args.name;
        },
      },
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`HTTP server runing on ${url}`);
});
