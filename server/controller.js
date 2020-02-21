const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body
        const db = req.app.get('db')

        let user = await db.check_user([username])
        user = user[0]
        if (user) {
            return res.status(400).send('Username taken')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        let newUser = await db.register_user([username, hash])
        newUser = newUser[0]
        res.status(201).send(newUser)
    },
    login: async (req, res) => {
        const { username, password } = req.body
        const db = req.app.get('db')

        let user = await db.check_user([username])
        user = user[0]
        if (!user) {
            return res.status(400).send('Incorrect Username')
        }

        const authenticated = bcrypt.compareSync(password, user.password)
        if (authenticated) {
            delete user.password
            res.status(202).send(user)
        } else {
            res.status(401).send('Incorrect password')
        }
    },
    getPosts: async (req, res) => {
        const { id } = req.params
        const { search, userposts } = req.query
        const db = req.app.get('db')

        const posts = await db.get_posts([id])
        if (userposts && search) {
            const filteredPosts = posts.filter(e => {
                e.title == search
            })
            res.status(200).send(filteredPosts)
        } else if (!userposts && !search) {
            const filteredPosts = posts.filter(e => {
                let userId = id
                e.id != userId
            })
            res.status(200).send(filteredPosts)
        } else if (!userposts && search) {
            const filteredPosts = posts.filter(e => {
                let userId = id
                e.id != userId && e.title == search
            })
            res.status(200).send(filteredPosts)
        } else {
            res.status(200).send(posts)
        }
    }
}