const users = [
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
const posts = [
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

const comments = [
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

const db = {
    users,
    posts,
    comments,
}

export { db as default}