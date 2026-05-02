require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");
const { ApolloServerPluginLandingPageLocalDefault } = require("@apollo/server/plugin/landingPage/default");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const { buildGraphqlContext } = require("./context");

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

const startServer = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("Falta configurar MONGO_URI en las variables de entorno.");
  }

  // GraphQL consulta la misma base MongoDB que usa el backend REST, pero corre aparte.
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Mongo conectado para GraphQL");

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  await apolloServer.start();

  // El contexto toma el JWT del header Authorization para identificar al usuario.
  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: buildGraphqlContext,
    })
  );

  app.listen(PORT, () => {
    console.log(`Servidor GraphQL corriendo en http://localhost:${PORT}/graphql`);
    console.log("Puedes abrir Apollo Sandbox o Apollo Studio desde ese enlace para probar las queries.");
  });
};

startServer().catch((error) => {
  console.error("Error iniciando GraphQL:", error);
  process.exit(1);
});
