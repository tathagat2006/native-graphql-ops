const Query = {
comments(parent,args,{ db },info) {
    return db.comments
},
posts(parent,args,{ db },info) {
    if(!args.query) {
        return db.posts
    }else {
        return db.posts.filter((post) => {
            const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
            const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
            return isTitleMatch || isBodyMatch
        })
    }
},
users(parent,args,{ db },info) {
    if(args.query) {
        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    }else {
        return db.users
    }
},
grades(parent,args,{ db },info) {
    return [99,80,93,78]
},
add(parent,args,{ db },info) {
    if(args.numbers.length === 0) {
        return 0
    }

    return args.numbers.reduce((accumulator,currentValue) => {
        return accumulator + currentValue
    })
},
greeting(parent,args,{ db },info) {
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

export { Query as default}