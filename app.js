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

  type Query {
    ipics(name: String): Ipics
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
          console.log(output);
          return output;
        });
    },
  },

  // Mutation: {
  //   createPokemon: (parent, args) => {
  //     data.pokemon.push(args.input);
  //     return { msg: `${args.input.name} Created Successfully!` };
  //   },
  //   modifyPokemon: (parent, args) => {
  //     let targetPoke = data.pokemon[args.input.id - 1];
  //     for (let key in args.input) {
  //       if (targetPoke[key] !== args.input[key] && key !== "id") {
  //         targetPoke[key] = args.input[key];
  //       }
  //     }
  //     return { msg: `Pokemon id:${args.input.id} is modified!` };
  //   },
  //   modifyAttacks: (parent, args) => {
  //     let targetType = Object.keys(data.attacks).find(
  //       (attackType) => attackType === args.modification
  //     );
  //     // for (let key in args.input) {
  //     //   if (targetPoke[key] !== args.input[key] && key !== "id") {
  //     //     targetPoke[key] = args.input[key];
  //     //   }
  //     // }
  //     return { msg: `Pokemon id:${args.input.id} is modified!` };
  //   },
  // },
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
