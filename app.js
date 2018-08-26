let express = require('express'),
	bodyParser = require('body-parser'),
	exphbs  = require('express-handlebars'),
	// ? для чего использовать Pool 
	{ Pool, Client } = require('pg'),
	app = express();


const USER = {
	// name and password - при входе в pgAdmin3
	name: 'postgres',
	password: 'test123',
	// Локальные данные
	host: 'localhost',
	port: '5432',
	// db - имя БД с которой работаю
	db: 'flights',
	// table - таблица с которой работаю, расположена в db
	table: 'flights1'
}

// Соединение с БД
const connect = `postgresql://${USER.name}:${USER.password}@${USER.host}:${USER.port}/${USER.db}`;


app.use(express.static(__dirname + '/public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


// Корень сайта
app.get('/', function(req, res){

	// ? Разница в использовании Pool и Client

	// const pool = new Pool({
	//   connectionString: connect,
	// });

	// pool.query('SELECT * FROM flights', (err, res2) => {
	//   res.render('home', {temp: res2.rows, test: 'hello'});
	//   pool.end();
	// });

	const client = new Client({
	  connectionString: connect,
	});
	client.connect();
	// Использую res2 чтобы не было конфликта имен
	client.query(`SELECT * FROM ${USER.table}`, (err, res2) => {
	  res.render('home', {temp: res2.rows, test: 'hello'});
	  client.end();
	});

}); 


// Добовляю пост (капитан :))
app.post('/add', function(req, res) {
	const client = new Client({
	  connectionString: connect,
	});
	client.connect();

	client.query(`INSERT INTO ${USER.table}(origin, destination, duration) VALUES($1, $2, $3)`, 
		[req.body.origin, req.body.destination, req.body.duration], (err, res2) => {
	  		res.redirect('/');
	  		client.end();

		});
});


// Удаляю пост (снова капитан :))
app.delete('/delete/:id', function(req, res) {
	const client = new Client({
	  connectionString: connect,
	});
	client.connect();

	client.query(`DELETE FROM ${USER.table} WHERE id = $1`, 
		[req.params.id], (err, res2) => {
	  		client.end();
	  		res.sendStatus(200); // ?
		});

});


// Редактирую
app.post('/edit', function(req, res) {
	const client = new Client({
	  connectionString: connect,
	});
	client.connect();

	client.query(`UPDATE ${USER.table} SET origin=$1, destination=$2, duration=$3 WHERE id = $4`, 
			[req.body.origin, req.body.destination, req.body.duration, req.body.id], (err, res2) => {
	  		res.redirect('/');
	  		client.end();
		});
});

app.listen(3000, function(){
	console.log('http://localhost:3000');
});