import uuidv4 from 'uuid/v4'

const Mutation = {
createUser(parent,args,{ db },info) {
    // console.log(args)
    const emailTaken = db.users.some((user) => {
        return user.email === args.data.email
    })
    if(emailTaken) {
        throw new Error('Email already taken!!')
    }

    const user = {
        id:uuidv4(),
        ...args.data
    }
    db.users.push(user)

    return user


},
deleteUser(parent,args,{ db },info) {
    const userIdx = db.users.findIndex((user) => {
        return user.id === args.id
    })
    if(userIdx === -1) {
        throw new Error("User not found...")
    }

    const deletedUsers = db.users.splice(userIdx, 1)
    //delete all associated posts
    db.posts = db.posts.filter((post) => {
        const match = post.author === args.id
        if(match) {
            comments = db.comments.filter((comment) => {
                comment.post !== post.id
            })
            return !match
        }
    })
    db.comments = db.comments.filter((comment) => {
        return comment.author !== args.id
    })
    return deletedUsers[0]

},
updateUser(parent, args, { db }, info) {
    const user = db.users.find((user) => {
        return user.id === args.id
    })

    if(!user) {
        throw new Error("User not found..")
    }
    if(typeof args.data.email === "string") {
        const emailTaken = db.users.some((user) => {
            return user.email === args.data.email
            if(emailTaken) {
                throw new Error('Email in use..')
            }

            user.email = args.data.email
        })
    }
    if(typeof args.data.name === 'string') {
        user.name = args.data.name
    }
    if(typeof args.data.age !== 'undefined' ) {
        user.age = args.data.age
    }

    return user
},
createPost(parent,args,{ db },info) {
    const userExist = db.users.some((user) => {
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

    db.posts.push(post)
    return post
},
deletePost(parent,args,{ db },info) {
    const postIdx = post.findIndex((post) => {
        return post.id === args.id
    })
    if(postIdx === -1) {
        throw new Error('Post not found..')
    }
    const deletedPost = db.posts.splice(postIdx, 1)
    const comments = db.comments.filter((comment) => {
        return comment.post !== args.id
    })
    
    return deletedPost[0]


},
updatePost(parent, args, { db }, info) {
    const { id, data } = args
    const post = db.posts.find((post) => post.id === id)

    if (!post) {
        throw new Error('Post not found')
    }

    if (typeof data.title === 'string') {
        post.title = data.title
    }

    if (typeof data.body === 'string') {
        post.body = data.body
    }

    if (typeof data.published === 'boolean') {
        post.published = data.published
    }

    return post
},
createComment(parent,args,{ db, pubsub },info) {
    const userExist = db.users.some((user) => {
        return user.id === args.data.author
    })

    const postExist = db.posts.some((post) => {
        return post.id === args.data.post && post.published
    })

    if(!userExist || !postExist) {
        throw new Error('Unable to find user and post')
    }
    const comment = {
        id:uuidv4(),
        ...args.data
    }
    db.comments.push(comment)
    pubsub.publish(`comment ${args.data.post}`, { comment })
    return post
},
deleteComment(parent, args, { db }, info) {
const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)

if (commentIndex === -1) {
    throw new Error('Comment not found')
}

const deletedComments = db.comments.splice(commentIndex, 1)

return deletedComments[0]
},
updateComment(parent, args, { db }, info) {
    const { id, data } = args
    const comment = db.comments.find((comment) => comment.id === id)

    if (!comment) {
        throw new Error('Comment not found')
    }

    if (typeof data.text === 'string') {
        comment.text = data.text
    }

    return comment
}
}

export { Mutation as default }
