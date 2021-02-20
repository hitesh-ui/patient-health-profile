const _ = require('lodash');
const express = require('express')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
var cors = require('cors')
var app = express()
app.use(cors())

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
app.use(bodyParser.json());

var TODOS = [
    // { 'id': 1, 'user_id': 1, 'name': "Get Milk", 'completed': false },
    // { 'id': 2, 'user_id': 1, 'name': "Fetch Kids", 'completed': true },
    // { 'id': 3, 'user_id': 2, 'name': "Buy flowers for wife", 'completed': false },
    // { 'id': 4, 'user_id': 3, 'name': "Finish Angular JWT Todo App", 'completed': false },
    {
        "Health Status": {
          "Height": "175 cms",
          "Weight": "65 kg",
          "Pulse Rate": "88 bpm",
          "BP": "120/160",
          "BMI": 25
        },
        "Medical Condition": {
          "Heart Disease": false,
          "Diabetics": true,
          "Blood Pressure": {
            "High BP": true,
            "Low BP": false
          }
        },
        "Personal info": {
          "Name": "John Doe",
          "Email": "john.doe@gmail.com",
          "Phone": "9876543210",
          "Age": "25 years"
        },
        "Timestamp": "YYYY-MM-DD hh:mm:ss"
      }
];
var USERS = [
    { 'id': 1, 'username': 'john.doe@gmail.com' }
];
function getTodos(userID) {
    var todos = _.filter(TODOS, ['user_id', userID]);

    return todos;
}
function getTodo(todoID) {
    var todo = _.find(TODOS, function (todo) { return todo.id == todoID; })

    return todo;
}
function getUsers() {
    return USERS;
}

app.get('/', function (req, res) {
    res.send('Angular JWT Todo API Server')
});
app.get('/api/todos', function (req, res) {
    res.type("json");
    res.send(getTodos(1));
});
app.get('/api/todos/:id', function (req, res) {
    var todoID = req.params.id;
    res.type("json");
    res.send(getTodo(todoID));
});
app.get('/api/users', function (req, res) {
    res.type("json");
    res.send(getUsers());
});


app.post('/api/auth', function(req, res) {
  const body = req.body;

  const user = USERS.find(user => user.username == body.username);
  if(!user || body.password != 'Test@123') return res.sendStatus(401);
  
  var token = jwt.sign({userID: user.id}, 'todo-app-super-shared-secret');
  res.send({token});
});

app.listen(4000, function () {
    console.log('Angular JWT Todo API Server listening on port 4000!')
});
