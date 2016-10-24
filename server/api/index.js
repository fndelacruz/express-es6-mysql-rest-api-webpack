import { version } from '../../package.json';
import { Router } from 'express';
import users from './users';

export default ({ config, db }) => {
	let router = Router();

	// mount the users resource
	router.use('/users', users({ config, db }));

	// perhaps expose some API metadata at the root
	router.get('/', (req, res) => {
		res.json({ version });
	});

	return router;
}
