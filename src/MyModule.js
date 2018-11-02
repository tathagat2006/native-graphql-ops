//Named export-since it has a name. advantage is we can have as many of them as possible.
//Default export-it does not have nay name. We can have only one of it.

const message = "Some messg from my module.js"
const name = 'Tathagat'
// create a variable for default export
const location = 'Delhi'

const getGreeting = (name) => {
    return `Welcome to the course ${name}`
}

export {
    location as default,
    name,
    message,
    getGreeting,
}