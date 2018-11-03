//Code just to learn import/export

import MyCurrentLocation, { getGreeting, message,name } from './MyModule'
import additionFunction, { subtract } from './math'

// console.log('Hello GraphQL!')
console.log(name)
console.log(MyCurrentLocation)
console.log(message)
console.log(getGreeting('Tathagat'))


//challenge test
console.log(additionFunction(2,3))
console.log(subtract(9,6))

//Main App code starts here

import { GraphQLServer } from 'graphql-yoga' //to create a graphql server

//Type definitions(schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`


//Resolvers(functions for each query)
const resolvers = {
    Query: {
        hello() {
            return 'This is my first Query..'
        },
        name() {
            return 'Tathagat'
        },
        location() {
            return 'I live in Delhi'
        },
        bio() {
            return 'I am a Full Stack Developer'
        }
    }
}

//Start our server

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('Server has started!')
})

