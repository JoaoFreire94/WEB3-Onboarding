import "reflect-metadata";
import express, { Express } from "express";
import { createTable } from "./controlers";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from "type-graphql";
import { Resolvers } from "./resolvers";


const main = async () => {
    const app: Express = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [Resolvers],
            validate: false
        }),
        context: ({ req, res }) => ({ req, res })
    })

    await apolloServer.start();
    apolloServer.applyMiddleware({ app })

    createTable();
    app.get("/", (req, res) => {
        res.send("Working",)
        console.log(req)
    })
    const PORT = process.env.PORT || 8001
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

}
main()