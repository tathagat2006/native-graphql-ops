import { GraphQLServer } from 'graphql-yoga' //to create a graphql server
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Comment from './resolvers/Comment'
import Post from './resolvers/Post'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        User,
        Comment,
        Post,
    },    
    context: {
        db,
    }
})

server.start(() => {
    console.log('Server has started!')
})

