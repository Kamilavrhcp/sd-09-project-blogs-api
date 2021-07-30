const express = require('express');
const bodyParser = require('body-parser');
const userControllers = require('./controllers/usersController');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');

const app = express();

app.use(bodyParser.json());

app.post('/user', userControllers.createUser);
app.post('/login', userControllers.login);
app.post('/categories', categoryController.createCategory);
app.post('/post', postController.createPost);

app.get('/user', userControllers.getAllUsers);
app.get('/user/:id', userControllers.getUserById);
app.get('/categories', categoryController.getAllCategories);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
