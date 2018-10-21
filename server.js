var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var config = require('config')

var app = express()

var User = require('./models/User.js')
var Concept = require('./models/Concept.js')
var auth = require('./auth.js')

mongoose.Promise = Promise

app.use(cors())
app.use(bodyParser.json())

// app.get('/posts/:id', async (req, res) => {
//     var author = req.params.id
//     var posts = await Concept.find({ author })
//     res.send(posts)
// })

// app.post('/post', auth.checkAuthenticated, (req, res) => {
//     var postData = req.body
//     postData.author = req.userId

//     var post = new Concept(postData)

//     post.save((err, result) => {
//         if (err) {
//             console.error('saving post error')
//             return res.status(500).send({ message: 'saving post error' })
//         }

//         res.sendStatus(200)
//     })
// })

app.get('/users', async (req, res) => {
    try {
        var users = await User.find({}, '-password -__v')
        res.send(users)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

// app.get('/profile/:id', async (req, res) => {
//     try {
//         var user = await User.findById(req.params.id, '-password -__v')
//         res.send(user)
//     } catch (error) {
//         console.error(error)
//         res.sendStatus(500)
//     }
// })

var mongoConnectionString = !process.env.NODE_ENV
    ? config.get('mongo.connectionString')
    : process.env.mongoConnectionString


mongoose.connect(mongoConnectionString, { useMongoClient: true }, (err) => {
    if (!err) {
        console.log('connected to mongo')
    } else {
        console.error('Error connecting to mongo')
    } 
})

app.use('/auth', auth.router)
app.listen(process.env.PORT || 3000)