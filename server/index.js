require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');

const checkForSession = require('./middlewares/checkForSession');

const search_controller = require('./controllers/search_controller');
const cart_controller = require('./controllers/cart_controller')
const swag_controller = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller');

const port = process.env.SERVER_PORT || 3000;


const app = express();
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(checkForSession);

app.get('/api/swag', swag_controller.read)

// AUTH_CONTROLLER ENDPOINT
app.post('/api/login', auth_controller.login)
app.post('/api/register', auth_controller.register)
app.post('/api/signout', auth_controller.signout)
app.get('/api/user', auth_controller.getUser)

// CART_CONTROLLER ENDPOINT
app.post('/api/cart', cart_controller.add)
app.post('/api/cart', cart_controller.checkout)
app.delete('/api/cart', cart_controller.remove)

// SEACH_CONTROLLER ENDPOINT
app.get('/api/search', search_controller.search)

app.listen(port, () => {
  console.log(`Server is UP and Listen on port ${port}`);
});
