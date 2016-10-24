import mysql from 'promise-mysql';
import defer from '../libs/defer'

export default (config, callback) => {
	const pool = mysql.createPool(config.db)

	const connect = (func) => {
		return pool.getConnection()
			.then((connection) => func(connection))
			.catch((err) => done(err))
	}

	callback({connect})
}
