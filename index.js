import { ApolloServer } from '@apollo/server'
import {mongoose} from 'mongoose'
import Journey from './models/journey.mjs'
import Station from './models/station.mjs'
import * as dotenv from 'dotenv'
dotenv.config()
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from '@graphql-tools/schema'




// eslint-disable-next-line no-undef
const MONGO_URI = process.env.MONGO_URI
console.log('connecting to', MONGO_URI)
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `#graphql 
scalar DateTime
type Journey {
  _id: ID!
  departure: DateTime
  return: DateTime
  departure_station_id: Int!
  departure_station_name: String!
  return_station_id: Int!
  return_station_name: String!
  covered_distance_m: Float!
  duration_sec: Int!
  }

  type Station {
    _id: ID!
    name: String!
    address: String!
    x: Float!
    y: Float!
  }

  type Query {
    journeyCount: Int!
    JourneyCountFromCertainStation(departure_station_name: String, return_station_name: String): Int!
    allJourneys(offset: Int, limit: Int): [Journey!]!
    findStation(name: String!): Station!
    allStations: [Station!]!
    findJourney(
      departure_station_name: String
      return_station_name: String
      ): [Journey!]!
  }
`

const resolvers = {
  Query: {
    journeyCount: async () => Journey.collection.countDocuments(),
    JourneyCountFromCertainStation: async (root, args) => {
      if (args.departure_station_name) {
        return Journey.collection.countDocuments({departure_station_name: args.departure_station_name })
      } else if (args.return_station_name) {
        return Journey.collection.countDocuments({return_station_name: args.return_station_name })}
    },
    allJourneys: async (root, args) => {
      if (args.limit) {
        return (
          await Journey.find({})
            .limit(args.limit)
            .skip(args.offset)
            .sort({duration:1})
        )
      }
      Journey.find({})   
    },
    findJourney: async (root, args) => {
      if (!args.departure_station_name) {
        return await Journey.find({
          return_station_name: args.return_station_name
        })
      } else if (!args.return_station_name) {
        return await Journey.find({
          departure_station_name: args.departure_station_name
        })
      }
      return await Journey.find({
        departure_station_name: args.departure_station_name,
        return_station_name: args.return_station_name
      }) 
    },
    findStation: async (root, args) => {
      return await Station.findOne({name: args.name})
    },
    allStations: async () => Station.find({}).sort({name:1})   
  },   
}

const app = express();
const httpServer = http.createServer(app);


const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  }),
})
await server.start()

app.use(
  cors(),
  express.static('build'),
  bodyParser.json(),
  expressMiddleware(server)
)

await new Promise((resolve) => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);