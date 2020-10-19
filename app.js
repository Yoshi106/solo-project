const knexfile = require("./knexfile");
const knex = require("knex")(knexfile.development);
const { gql } = require("apollo-server");
const { ApolloServer } = require("apollo-server");
// const data = require("./data");

const typeDefs = gql`
  type Member {
    id: Int
    name: String
    group: String
  }

  input MemberInput {
    id: Int!
    name: String!
    group: String!
  }

  type Message {
    msg: String
  }

  type Query {
    findMember(name: String): Member
    findAllMembers: [Member]
  }
  type Mutation {
    modifyGroup(name: String, group: String): Message
    createMember(input: MemberInput): Message
    removeMember(name: String): Message
  }
`;

resolvers = {
  Query: {
    findMember: (parent, args) => {
      return knex
        .select()
        .table("company")
        .then((members) => {
          let output;
          [output] = members.filter((member) => member.name === args.name);
          return output;
        });
    },
    findAllMembers: (parent, args) => {
      return knex
        .select()
        .table("company")
        .then((members) => {
          return members;
        });
    },
  },

  Mutation: {
    modifyGroup: async (parent, args) => {
      await knex("company")
        .where({
          name: args.name,
        })
        .update({
          group: args.group,
        });
      return { msg: "Updated!" };
    },
    createMember: async (parent, args) => {
      await knex("company").insert(args.input);
      return { msg: "Created!" };
    },
    removeMember: async (parent, args) => {
      await knex("company")
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

const express = require("express");

const app = express();

app.use(express.static("./client/"));

app.listen(5000, () => {
  console.log("litening @ 5000");
});
