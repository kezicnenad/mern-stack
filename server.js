// MODULES IMPORT AND VARIABLES
import express from 'express'
import routesApartman from "./routes/apartmanRoutes.js";
import routesPlacanje from "./routes/placanjeRoutes.js";
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import stripe from 'stripe'
const port = process.env.PORT || 5000;

// DEFINE EXPRESS.JS
const app = express()

// .ENV CONFIGURATION
dotenv.config();

// .ENV TOKEN CONFIG
process.env.TOKEN_SECRET;

// MONGOOSE CONNECTION
mongoose.Promise = global.Promise
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// SETUP ROUTES SECURITY
app.use(express.json());
app.use(cookieParser());

// STRIPE PAYING
stripe(process.env.STRIPE_PRIVATE_KEY)

// HEADER BASED MECHANISM THAT ALLOWS TO INDICATE ANY ORIGINS, DOMAIN, SCHEME OR PORT
app.use(
  cors({
    origin: [
      "https://kezicnenad.netlify.app",
      "http://localhost:3000"
    ],
    credentials: true,
  })
);

// BODYPARSER SETUP
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// ROUTES
routesApartman(app);
routesPlacanje(app);

// SERVING STATIC FILES
app.use(express.static('public'))

// ROOT TEST ENDPOINT
app.get('/', (req, res) => {
  res.send('API Server running')
})

// SETUP SERVER
app.listen(port, () => {
  console.log("Server is running on port", port);
})