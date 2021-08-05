const express = require('express');
const userController = require('./controller/userController');
const loginController = require('./controller/loginController');

const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

app.use(express.json());

app.use('/user', userController);
app.use('/login', loginController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
