const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const C = require('./controllers');
// const All = require('./controllers/All');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Ouvidos posicionados na porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app
  .route('/user')
  .post([
    C.ValidateNewUser,
    C.GenerateToken,
    C.InsertUser,
  ])
  .get([
    C.ValidateToken,
    C.GetAllUsers,
  ]);

app.get('/user/:id', [
  C.ValidateToken,
  C.GetUserById,
]);

  app
  .route('/login')
  .post([
    C.ValidateLogin,
    C.GenerateToken,
    C.LoginSuccessFul,
  ])
  .get(() => {});
