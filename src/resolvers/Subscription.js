const Subscription = {
    count: {
        subscribe(parent, args, { pubsub }, info) {
            let count = 0

            setInterval(() => {
                count++
                pubsub.publish('count',{
                    count: count
                })
            },1000)

            return pubsub.asyncIterator('count')
        }
    }
}

export { Subscription as default }