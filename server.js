const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    connectinString : process.env.DATABASE_URL,
    ssl: true
  }
});

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res)=>{
  res.json('running success')
})

app.post('/signin', (req, res)=>signin.handleSignin(req, res, db, bcrypt))

app.post('/register', (req, res)=>{register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res)=>(profile.handleProfile(req, res, db)))

app.put('/image', (req, res)=>(image.handleImage(req, res, db)))

app.post('/imageurl', (req,res)=>(image.handleApiCall(req, res)))



app.listen(process.env.PORT || 3000,()=>{
  console.log(`app is running on the port ${process.env.PORT}`)
})
