var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: '跟老婆一起吃午餐',
	completed: false
}, {
	id: 2,
	description: '去菜市場',
	completed: false
}];

app.get('/', function(req, res) {
	res.send('Todo API Root');
});

// GET /todos
app.get('/todos', function(req, res) {
	res.json(todos);
});

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT + '!');
});