// MODULES IMPORT AND VARIABLES
import express from 'express'
import routesApartmani from "./routes/apartmaniRoutes.js";
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

const paymentIntent = await stripe.paymentIntents.create({
  amount: 500,
  currency: "gbp",
  payment_method: "pm_card_visa",
});


// HEADER BASED MECHANISM THAT ALLOWS TO INDICATE ANY ORIGINS, DOMAIN, SCHEME OR PORT
app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "http://localhost:3000",
      "https://mernstackanje.herokuapp.com",
      "https://kezicnenad.netlify.app",
    ],
    credentials: true,
  })
);

// BODYPARSER SETUP
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// ROUTES
routesApartmani(app);
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