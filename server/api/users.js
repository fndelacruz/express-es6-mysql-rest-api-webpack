import { Router } from 'express';
import { test } from '../models/user';

export default ({ config, db }) => {
	const router = Router();

	router.get('/', (req, res) => {
		test(db).then((results) => {
            res.json(results)
        })
	});

	return router
}
