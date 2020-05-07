const sqlite3 = require('sqlite3').verbose();
const USERS_TABLE = 'users';
const BALANCES_TABLE = 'balances';
const MATCHES_TABLE = 'matches';
const RECORDS_TABLE = 'records';
const BETS_TABLE = 'bets';

const acquireDb = () => new sqlite3.Database('rps.sqlite3', error => {
    if (!error) return;
    console.error('Something has gone awry: ', error);
});

const releaseDb = db => db.close(error => {
    if (!error) return console.log('Done.');
    console.error('Something has gone awry: ', error);
});

const usingDb = callback => {
    const db = acquireDb();
    db.serialize(() => callback(db));
    releaseDb(db);
};

const seedDatabase = db => {
    console.log('Seeding database.');
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS ${USERS_TABLE} (
           userId INTEGER PRIMARY KEY,
           username TEXT NOT NULL,
           password TEXT NOT NULL,
           createdOn NUMERIC NOT NULL,
           lastLogin NUMERIC NOT NULL)`);
        
        db.run(`CREATE TABLE IF NOT EXISTS ${BALANCES_TABLE} (
           userId NUMERIC NOT NULL,
           balance NUMERIC NOT NULL)`);

        db.run(`CREATE TABLE IF NOT EXISTS ${RECORDS_TABLE} (
           userId NUMERIC NOT NULL,
           matchesEntered NUMERIC NOT NULL,
           matchesWon NUMERIC NOT NULL)`);

        db.run(`CREATE TABLE IF NOT EXISTS ${BETS_TABLE} (
           matchId NUMERIC NOT NULL,
           winningUserId NUMERIC NOT NULL,
           bettingUserId NUMERIC NOT NULL,
           betAmount NUMERIC NOT NULL,
           paidOut NUMERIC DEFAULT 0)`);

        db.run(`CREATE TABLE IF NOT EXISTS ${MATCHES_TABLE} (
           matchId INTEGER PRIMARY KEY,
           winningUserId NUMERIC DEFAULT 0,
           player1Id NUMERIC NOT NULL,
           player1Victories NUMERIC NOT NULL,
           player2Id NUMERIC NOT NULL,
           player2Victories NUMERIC NOT NULL,
           active NUMERIC DEFAULT 0)`);
    });

    // (create-all-seed-users '("RaycatWhoDat" "Oliver" "Olivia" "Tim" "James" "Jen" "David" "Samantha"))
    const seedUsers = [
        {"username":"RaycatWhoDat","password":"test1"},
        {"username":"Oliver","password":"test2"},
        {"username":"Olivia","password":"test3"},
        {"username":"Tim","password":"test4"},
        {"username":"James","password":"test5"},
        {"username":"Jen","password":"test6"},
        {"username":"David","password":"test7"},
        {"username":"Samantha","password":"test8"}
    ];

    seedUsers.forEach(user => {
        createUser(db, user).then(createAdditionalInfo.bind(this, db));
    });
};

const createUser = (db, user) => new Promise(resolve => {
    console.log('Creating user: ', user.username);
    const statement = db.prepare(`INSERT INTO ${USERS_TABLE} (username, password, createdOn, lastLogin) VALUES (?, ?, ?, ?)`);
    const currentDate = new Date();

    user.createdOn = currentDate.getTime();
    user.lastLogin = currentDate.getTime();

    statement.run(user.username, user.password, user.createdOn, user.lastLogin, function (error) {
        console.log('Last inserted ID: ', this.lastID);
        resolve(this.lastID);
    });
    
    statement.finalize();
});

const createAdditionalInfo = (db, userId) => new Promise(resolve => {
    db.run(`INSERT INTO ${BALANCES_TABLE} VALUES (?, ?)`, [userId, 5000]);
    db.run(`INSERT INTO ${RECORDS_TABLE} VALUES (?, ?, ?)`, [userId, 0, 0]);
    resolve(null);
});

const getUserRecord = (db, userId) => new Promise((resolve, reject) => {
    console.log(`Getting user record for ID: ${userId}.`);
    const sqlQuery = [
        `SELECT`,
        [
            `u.userId`,
            `u.userName`,
            `u.createdOn`,
            `u.lastLogin`,
            `b.balance as currentBalance`,
            `r.matchesEntered`,
            `r.matchesWon`
        ].join(', '),
        `FROM ${USERS_TABLE} u`,
        `INNER JOIN ${BALANCES_TABLE} b`,
        `INNER JOIN ${RECORDS_TABLE} r`,
        `WHERE u.userId = ${userId}`
    ].join(' ');
    
    db.get(sqlQuery, (error, row) => {
        if (error) return reject({});
        resolve(row || {});
    });
});

const updateMatchHistory = (db, userId, playerId, playerWon) => new Promise((resolve, reject) => {
    console.log(`Updating match history for ID: ${userId}.`);
    const playerVictoryColumn = playerId === 1 ? 'player1Victories' : 'player2Victories';
    const playerIdColumn = playerId === 1 ? 'player1Id' : 'player2Id';
    
    const sqlQuery = [
        `UPDATE ${RECORDS_TABLE}`,
        `SET matchesEntered = matchesEntered + 1`,
        playerWon ? `, matchesWon = matchesWon + 1` : '',
        `WHERE userId = ${userId};`,
        `UPDATE ${MATCHES_TABLE}`,
        `SET ${playerVictoryColumn} = ${playerVictoryColumn} + 1`,
        `WHERE ${playerIdColumn} = ${userId};`,
    ].join(' ');

    db.run(sqlQuery, error => resolve(null));
});

const retrieveMatchHistories = db => new Promise((resolve, reject) => {
    console.log('Retrieving match histories.');
    const sqlQuery = [
        `SELECT`,
        [
            `u.userId`,
            `u.username`,
            `b.balance as currentBalance`,
            `r.matchesEntered`,
            `r.matchesWon`
        ].join(', '),
        `FROM ${RECORDS_TABLE} r`,
        `INNER JOIN ${BALANCES_TABLE} b`,
        `INNER JOIN ${USERS_TABLE} u`,
        `WHERE r.userId = u.userId`,
        `AND r.userId = b.userId`,
        `ORDER BY u.userId ASC`
    ].join(' ');

    const matchHistories = [];
    db.each(sqlQuery, (error, row) => {
        matchHistories.push(row);
    }, (error, numberOfRows) => {
        matchHistories.sort((history1, history2) => history1.matchesEntered - history2.matchesEntered);
        resolve(matchHistories);
    });
});

const placeBet = (db, matchId, userInfo, betAmount) => new Promise((resolve, reject) => {
    console.log(`Placing a bet for ${betAmount} on ${userInfo.winningUsername} to win.`);
    const sqlQuery = `INSERT INTO ${BETS_TABLE} VALUES (?, ?, ?, ?, ?)`;
    db.run(sqlQuery, [matchId, userInfo.winningUserId, userInfo.bettingUserId, betAmount, 0], error => resolve(null));
});

const createMatch = (db, player1Id, player2Id) => new Promise((resolve, reject) => {
    console.log(`Creating match between ${player1Id} and ${player2Id}.`);
    const sqlQuery = `INSERT INTO ${MATCHES_TABLE} VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.run(sqlQuery, [null, 0, player1Id, 0, player2Id, 0, 1], function (error) {
        return resolve(this.lastID);
    });
});

const updateMatch = (db, matchId, playerId, matchFinished) => new Promise((resolve, reject) => {
    console.log(`Player ${playerId} of match ${matchId} has won a game.`);
    if (matchFinished) console.log(`Player ${playerId} has won their match.`);
    const sqlQuery = [
        `UPDATE ${MATCHES_TABLE} SET`,
        [
            `player${playerId}Victories = player${playerId}Victories + 1`,
            `active = ${Number(matchFinished === false)}`
        ].join(', '),
        `WHERE matchId = ${matchId}`
    ].join(' ');

    db.run(sqlQuery, error => resolve(null));
});

const getActiveMatches = db => new Promise((resolve, reject) => {
    console.log('Retrieving active matches.');
    const sqlQuery = [
        `SELECT`,
        [
            `m.matchId`,
            `m.player1Id`,
            `u1.username AS player1Username`,
            `m.player2Id`,
            `u2.username AS player2Username`,
            `m.player1Victories`,
            `m.player2Victories`,
            `m.winningUserId`
        ].join(', '),
        `FROM matches m`,
        `INNER JOIN users u1`,
        `INNER JOIN users u2`,
        `WHERE m.player1Id = u1.userId`,
        `AND m.player2Id = u2.userId`,
        `AND m.active = 1`,
        `LIMIT 8`
    ].join(' ');

    const matches = [];
    db.each(sqlQuery, (error, row) => {
        matches.push(row);
    }, (error, numberOfRows) => {
        matches.sort((match1, match2) => match1.matchId - match2.matchId);
        resolve(matches);
    });
});

module.exports = {
    usingDb,
    acquireDb,
    releaseDb,
    seedDatabase,
    getUserRecord,
    updateMatchHistory,
    retrieveMatchHistories,
    placeBet,
    getActiveMatches,
    createMatch,
    updateMatch
};
