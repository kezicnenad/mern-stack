// MODULES IMPORT AND VARIABLES
import express from 'express'
import routes from './routes/artikliRoutes.js'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const PORT = process.env.PORT || 5000;

// DEFINE EXPRESS.JS
const app = express()

// .ENV CONFIGURATION
dotenv.config();

// MONGOOSE CONNECTION
mongoose.Promise = global.Promise
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// SETUP ROUTES SECURITY
app.use(express.json());
app.use(cookieParser());

// HEADER BASED MECHANISM THAT ALLOWS TO INDICATE ANY ORIGINS, DOMAIN, SCHEME OR PORT
app.use(cors({
  origin: ["http://localhost:5000"],
  credentials: true,
}));

// BODYPARSER SETUP
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// ROUTES
routes(app)

// SERVING STATIC FILES
app.use(express.static('public'))

// ROOT TEST ENDPOINT
app.get('/', (req, res) => {
  res.send('API Server running')
})

// SETUP SERVER
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port", process.env.PORT || 5000);
})