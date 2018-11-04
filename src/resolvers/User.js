const User = {
posts(parent,args,{ db },info) {
    return db.posts.filter((post) => {
        return post.author === parent.id
    })
}
}