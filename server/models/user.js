export const test = (db) => {
    return db.connect((connection) => {
        return connection.query("SELECT * FROM USER")
    })
}
