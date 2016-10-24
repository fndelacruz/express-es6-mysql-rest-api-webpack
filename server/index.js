import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import defer from '../libs/defer'
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from '../config/server.json';

const app = express();
app.server = http.createServer(app);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

app.use('/public', express.static('public'));

app.get('/', function(req,res,next) {
	res.render('index', {name:"Sapiens"})
})

// connect to db
initializeDb(config, db => {

	// internal middleware
	app.use(middleware({ config, db }));

	// api router
	app.use('/api', api({ config, db }));

	app.server.listen(process.env.PORT || config.port);

	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
