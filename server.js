const path = require('path');
const express = require('express');
const history = require('connect-history-api-fallback');
const cors = require('cors');
const { usingDB, acquireDb, releaseDb, seedDatabase, getUserRecord } = require('./sqlite-utils');

const app = express();

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

app.use(cors());

app.get('/db/seed', async (req, res) => {
    usingDb(seedDatabase);
    return res.status(200).send('OK.');
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

