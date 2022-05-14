import express from 'express'
import routes from './routes/artikliRoutes.js'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

const app = express()
const PORT = process.env.PORT || 5000

// MONGOOSE CONNECTION
mongoose.Promise = global.Promise
mongoose.connect("mongodb+srv://admin:Nesher7384@server.8f37l.mongodb.net/mernStackBackend?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// BODYPARSER SETUP
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app)

// SERVING STATIC FILES
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('API Server')
})

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})