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

//Demo user data
let users = [
    {
        id: '1',
        name: 'Tathagat',
        email: 'tathagat@example.com',
        age: 21
    },
    {
        id: '2',
        name: 'Mike',
        email: 'mike@example.com',
        age: 23
    },
    {
        id: '3',
        name: 'Andrew',
        email: 'andrew@example.com',
    }
]

//Demo posts data

let posts = [
    {
        id: 'p1',
        title: 'post1',
        body: 'this is my first post',
        published: true,
        author: '1',
    },
    {
        id: 'p2',
        title: 'post2',
        body: 'this is my second post',
        published: false,
        author: '1',
    },
    {
        id: 'p3',
        title: 'post3',
        body: 'this is my third post in a row',
        published: true,
        author: '2',
    },
]

let comments = [
    {
        id: 'c1',
        text: 'this is an awesome comment',
        author: '1',
    },
    {
        id: 'c2',
        text: 'this is another awesome comment',
        author: '2',
    },
    {
        id: 'c3',
        text: 'this is another amazing comment',
        author: '3',
    },
    {
        id: 'c4',
        text: 'fantabulous comment',
        author: '1',
    }
]

import { GraphQLServer } from 'graphql-yoga' //to create a graphql server
import uuidv4 from 'uuid/v4'

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
        comments(query: String): [Comment!]!
        users(query: String): [User!]!
        posts(query:String): [Post]!
        greeting(name: String): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
        me: User!
        post: Post!
    }

    type Mutation {
        createUser(data: CreateUserInput!): User!
        deleteUser(id: ID!): User!
        createPost(data: CreatePostInput!): Post!
        createComment(data: CreateCommentInput!): Comment!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int
    }

    input CreatePostInput: {
        titile: String!
        body: String!
        published: Boolean!
        author: ID!
    }

    input CreateCommentInput {
        text: String!
        author: ID!
        post: ID!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
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
        comments(parent,args,ctx,info) {
            return comments
        },
        posts(parent,args,ctx,info) {
            if(!args.query) {
                return posts
            }else {
                return posts.filter((post) => {
                    const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                    const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                    return isTitleMatch || isBodyMatch
                })
            }
        },
        users(parent,args,ctx,info) {
            if(args.query) {
                return users.filter((user) => {
                    return user.name.toLowerCase().includes(args.query.toLowerCase())
                })
            }else {
                return users
            }
        },
        grades(parent,args,ctx,info) {
            return [99,80,93,78]
        },
        add(parent,args,ctx,info) {
            if(args.numbers.length === 0) {
                return 0
            }

            return args.numbers.reduce((accumulator,currentValue) => {
                return accumulator + currentValue
            })
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
    },
    Mutation: {
        createUser(parent,args,ctx,info) {
            // console.log(args)
            const emailTaken = users.some((user) => {
                return user.email === args.data.email
            })
            if(emailTaken) {
                throw new Error('Email already taken!!')
            }

            const user = {
                id:uuidv4(),
                ...args.data
            }
            users.push(user)

            return user


        },
        deleteUser(parent,args,ctx,info) {
            const userIdx = users.findIndex((user) => {
                return user.id === args.id
            })
            if(userIdx === -1) {
                throw new Error("User not found...")
            }

           const deletedUsers = users.splice(userIdx, 1)
           //delete all associated posts
           posts = posts.filter((post) => {
               const match = post.author === args.id
               if(match) {
                   comments = comments.filter((comment) => {
                       comment.post !== post.id
                   })
                   return !match
               }
           })
           comments = comments.filter((comment) => {
               return comment.author !== args.id
           })
           return deletedUsers[0]

        },
        createPost(parent,args,ctx,info) {
            const userExist = users.some((user) => {
                return user.id === args.data.author
            })

            if(!userExist) {
                throw new Error('User not found..')
            }
            const post = {
                id: uuidv4(),
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: args.data.author,
            }

            posts.push(post)
            return post
        },
        createComment(parent,args,ctx,info) {
            const userExist = users.some((user) => {
                return user.id === args.data.author
            })

            const postExist = posts.some((post) => {
                return post.id === args.data.post && post.published
            })

            if(!userExist || !postExist) {
                throw new Error('Unable to find user and post')
            }
            const comment = {
                id:uuidv4(),
                ...args.data
            }
            comments.push(comment)
            return post
        }
    },
    Post: {
        author(parent,args,ctx,info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    },
    User: {
        posts(parent,args,ctx,info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        }
    },
    Comment: {
        author(parent,args,ctx,info) {
            return users.find((user) => {
                return user.id === parent.author
            })
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

