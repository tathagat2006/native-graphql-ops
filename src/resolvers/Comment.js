const Comment = {
author(parent,args,{ db },info) {
    return db.users.find((user) => {
        return user.id === parent.author
    })
}
}