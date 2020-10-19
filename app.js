const knexfile = require("./knexfile");
const knex = require("knex")(knexfile.development);
const { gql } = require("apollo-server");
const { ApolloServer } = require("apollo-server");
// const data = require("./data");

const typeDefs = gql`
  type Ipics {
    id: Int
    name: String
    group: String
  }

  input IpicsInput {
    id: Int!
    name: String!
    group: String!
  }

  type Message {
    msg: String
  }

  type Query {
    ipics(name: String): Ipics
  }
  type Mutation {
    modifyGroup(name: String, group: String): Message
    createMember(input: IpicsInput): Message
    removeMember(name: String): Message
  }
`;

resolvers = {
  Query: {
    ipics: (parent, args) => {
      return knex
        .select()
        .table("ipics")
        .then((members) => {
          let output;
          [output] = members.filter((member) => member.name === args.name);
          return output;
        });
    },
  },

  Mutation: {
    modifyGroup: async (parent, args) => {
      await knex("ipics")
        .where({
          name: args.name,
        })
        .update({
          group: args.group,
        });
      return { msg: "Updated!" };
    },
    createMember: async (parent, args) => {
      await knex("ipics").insert(args.input);
      return { msg: "Created!" };
    },
    removeMember: async (parent, args) => {
      await knex("ipics")
        .where({
          name: args.name,
        })
        .delete();
      return { msg: "Removed!" };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(
    `Running a GraphQL API server with Apollo at localhost:${PORT}/graphql`
  );
});

// const express = require("express");

// const app = express();

// app.use(express.static("./"));

// app.get("/hello", (_, res) => {
//   res.send("Hello");
// });

// app.listen(5000, () => {
//   console.log("litening @ 5000");
// });
