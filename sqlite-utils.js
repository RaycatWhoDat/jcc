const sqlite3 = require('sqlite3').verbose();
const USERS_TABLE = 'users';
const BALANCES_TABLE = 'balances';

const acquireDb = () => new sqlite3.Database('rps.sqlite3', error => {
    if (!error) return console.log('Connected to the RPS database.');
    console.error('Something has gone awry: ', error.error);
});

const releaseDb = db => db.close(error => {
    if (!error) return console.log('Done.');
    console.error('Something has gone awry: ', error.error);
});

const usingDb = callback => {
    const db = acquireDb();
    db.serialize(callback.bind(this, db));
    releaseDb(db);
};

const seedDatabase = db => {
    console.log('Seeding database.');
    db.run(`CREATE TABLE IF NOT EXISTS ${USERS_TABLE} (
           userId INTEGER PRIMARY KEY,
           username TEXT NOT NULL,
           password TEXT NOT NULL,
           createdOn NUMERIC NOT NULL,
           lastLogin NUMERIC NOT NULL)`);
    
    db.run(`CREATE TABLE IF NOT EXISTS ${BALANCES_TABLE} (
           userId NUMERIC NOT NULL,
           balance NUMERIC NOT NULL)`);
    
    const statement = db.prepare(`INSERT INTO ${USERS_TABLE} (username, password, createdOn, lastLogin) VALUES (?, ?, ?, ?)`);
    const currentDate = new Date();
    
    const seedUsers = [
        {
            username: 'RaycatWhoDat',
            password: 'test',
            createdOn: currentDate.getTime(),
            lastLogin: currentDate.getTime()
        }
    ];

    seedUsers.forEach((user, index) => {
        statement.run(user.username, user.password, user.createdOn, user.lastLogin);
        db.run(`INSERT INTO ${BALANCES_TABLE} VALUES (?, ?)`, [index + 1, 0]);
    });

    statement.finalize();
};

const getUserRecord = (db, userId) => new Promise(resolve => {
    console.log(`Getting user record for ID: ${userId}.`);
    const sqlQuery = `SELECT * FROM ${USERS_TABLE} WHERE userId = ${userId}`;
    
    db.get(sqlQuery, (error, row) => {
        if (error || !row) return resolve({});
        const { username, createdOn, lastLogin } = row;
        resolve({ username, createdOn, lastLogin });
    });
});

module.exports = {
    usingDb,
    acquireDb,
    releaseDb,
    seedDatabase,
    getUserRecord
};
