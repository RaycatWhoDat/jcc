const path = require('path');
const express = require('express');
const history = require('connect-history-api-fallback');
const sqlite3 = require('sqlite3').verbose();

const app = express();

const USERS_TABLE = 'users';
const BALANCES_TABLE = 'balances';

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

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

const getUserRecord = async (db, userId) => {
    let userRecord = {};
    await db.get(`SELECT * FROM ${USERS_TABLE} WHERE userId = ${userId}`, (error, row) => {
        if (!row) return;
        const { username, createdOn, lastLogin } = row;
        userRecord = { username, createdOn, lastLogin };
        console.log(userRecord);
    });
    return userRecord;
};

app.get('/db/seed', async (req, res) => {
    usingDb(seedDatabase);
    return res.status(200).send('OK.');
});

app.get(`/db/${USERS_TABLE}/:userId`, async (req, res) => {
    const db = acquireDb();
    const userRecord = await getUserRecord(db, req.params.userId);
    releaseDb(db);

    console.log(userRecord);
    
    return res.status(200).json(userRecord);
});

app.use(history());
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(app.get('port'), () => console.log(`Listening on port ${PORT}!`));

