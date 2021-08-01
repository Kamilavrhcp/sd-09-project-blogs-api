const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/UserController');
const { error } = require('./middlewares');

const app = express();

app.use(bodyParser.json());

app.use(express.json());

app.use('/user', userController);
app.use(error);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
