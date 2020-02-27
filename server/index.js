const express = require('express')
const consola = require('consola')
const {Router} = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passportStrategy = require('./middleware/passport-strategy');
// ограничитель запросов по IP
const RateLimit = require('express-rate-limit');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const keys = require('./keys')
const router = Router()
const { Nuxt, Builder } = require('nuxt')

const authRoutes = require('./routes/auth.routes');
const cityRoutes = require('./routes/city.routes');
const formRoutes = require('./routes/form.routes');

const app = express()

mongoose.connect(keys.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(error => console.log(error))

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.use(passport.initialize())
passport.use(passportStrategy)

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
  extended: true, limit: '40mb'
}));
app.use(bodyParser.json( {limit: '40mb'} ));
app.use(cors());

// для apiLimiter
app.enable('trust proxy'); 

const apiLimiter = new RateLimit({
  windowMs: 5*60*1000, // 5 minutes
  max: 300,
});

// использование ограничителя запросов на одном IP
app.use(apiLimiter)
app.use('/api/auth', authRoutes)
app.use('/api/city', cityRoutes)
app.use('/api/form', formRoutes)


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
