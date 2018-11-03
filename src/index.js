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
// const typeDefs = `
//     type Query {
//         hello: String!
//         name: String!
//         location: String!
//         bio: String!
//     }
// `

//Using 5 Scalar types
// const typeDefs = `
//     type Query {
//         id: ID!
//         name: String!
//         age: Int!
//         employed: Boolean!
//         gpa: Float
//     }
// `

//Using custom types
const typeDefs = `
    type Query {
        greeting(name: String): String!
        grades: [Int!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`


//Resolvers(functions for each query)
const resolvers = {
    // Query: {
    //     hello() {
    //         return 'This is my first Query..'
    //     },
    //     name() {
    //         return 'Tathagat'
    //     },
    //     location() {
    //         return 'I live in Delhi'
    //     },
    //     bio() {
    //         return 'I am a Full Stack Developer'
    //     }
    // }

    // Query: {
    //     id() {
    //         return 'abc123'
    //     },
    //     name() {
    //         return 'Tathagat'
    //     }, 
    //     age() {
    //         return 21
    //     },
    //     employed() {
    //         return false
    //     },
    //     gpa() {
    //         return null
    //     },
    // }

    Query: {
        grades(parent,args,ctx,info) {
            return [99,80,93,78]
        },
        greeting(parent,args,ctx,info) {
            console.log(args)
            if(args.name) {
                return `Hello, ${args.name}!`
            }else{
                return 'Hello'
            }
        },
        me() {
            return {
                id:'123456',
                name: 'Tathagat',
                email: 'tathagat@example.com',
                age:21,
            }
        },
        post() {
            return {
                id: '123@post',
                title: 'My first post',
                body: '',
                published: false,
            }
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

