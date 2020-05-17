const path = require('path');
const express = require('express');
const history = require('connect-history-api-fallback');
const cors = require('cors');
const bodyParser = require('body-parser');

const {
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
    updateMatch,
    getAllBetsByMatchId,
    updateCurrentBalance,
    authenticateUser
} = require('./sqlite-utils');

const app = express();

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

app.use(cors());
app.use(bodyParser.json());

app.get('/db/seed', async (req, res) => {
    const db = acquireDb();
    await seedDatabase(db);
    releaseDb(db);
    return res.status(200).json({ results: 'Done.' });
});

app.post('/db/auth', async (req, res) => {
    const db = acquireDb();
    const { username, password } = req.body || {};
    const results = await authenticateUser(db, username, password);
    releaseDb(db);

    if (Object.keys(results).length) console.log(`Successfully logged in as: ${username}.`);
    return res.status(200).json({ results });
});

app.put(`/db/balances/:userId`, (req, res) => {
    const db = acquireDb();
    const { currentBalance } = req.body || {};
    updateCurrentBalance(db, req.params.userId, currentBalance).then(() => {
        releaseDb(db);
        res.status(200).json({ results: 'Done.' });
    }, () => res.status(500).send(null));
});

app.get(`/db/records`, (req, res) => {
    const db = acquireDb();
    retrieveMatchHistories(db).then(results => {
        releaseDb(db);
        res.status(200).json({ results });
    }, () => res.status(500).send(null));
});

app.put(`/db/records/:userId`, (req, res) => {
    const db = acquireDb();
    const { playerId, playerWon } = req.body || {};
    updateMatchHistory(db, req.params.userId, playerId, playerWon).then(() => {
        releaseDb(db);
        res.status(200).json({ results: 'Done.' });
    }, () => res.status(500).send(null));
});

app.get(`/db/bets/:matchId`, (req, res) => {
    const db = acquireDb();
    getAllBetsByMatchId(db, req.params.matchId).then(allBets => {
        releaseDb(db);
        res.status(200).json({ results: allBets });
    }, () => res.status(500).send(null));
});

app.post(`/db/bets`, (req, res) => {
    const db = acquireDb();
    const { matchId, userInfo, betAmount } = req.body || {};
    placeBet(db, matchId, userInfo, betAmount).then(() => {
        releaseDb(db);
        res.status(200).json({ results: 'Done.' });
    }, () => res.status(500).send(null));
});

app.get(`/db/matches`, (req, res) => {
    const db = acquireDb();
    getActiveMatches(db).then(results => {
        releaseDb(db);
        res.status(200).json({ results });
    }, () => res.status(500).send(null));
});

app.post(`/db/matches`, (req, res) => {
    const db = acquireDb();
    const { player1Id, player2Id } = req.body || {};
    createMatch(db, player1Id, player2Id).then(matchId => {
        releaseDb(db);
        res.status(200).json({ results: { matchId } });
    }, () => res.status(500).send(null));
});

app.put(`/db/matches`, (req, res) => {
    const db = acquireDb();
    const { matchId, playerId, matchFinished } = req.body || {};
    updateMatch(db, matchId, playerId, matchFinished).then(() => {
        releaseDb(db);
        res.status(200).json({ results: 'Done.' });
    }, () => res.status(500).send(null));
});

app.get(`/db/users/:userId`, (req, res) => {
    const db = acquireDb();
    let userRecord = {};
    getUserRecord(db, req.params.userId).then(userRecord => {
        releaseDb(db);
        res.status(200).json(userRecord);
    }, () => res.status(500).send(null));
});

app.use(history());
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(app.get('port'), () => console.log(`Listening on port ${PORT}!`));

