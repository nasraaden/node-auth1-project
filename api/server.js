const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const dbConnection = require('../data/db-config.js');

const authRouter = require('../auth/auth-router.js');
const userRouter = require('../users/user-router.js');
const configureMiddleware = require('./configure-middleware.js');

const server = express();

const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'Keep it a secret, keep it safe.',
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
        knex: dbConnection,
        tablename: 'sessions',
        sidfieldname: 'sid',
        createTable: true,
        clearInterval: 60000
    })
}

configureMiddleware(server);

server.use(helmet());
server.use(session(sessionConfig));
server.use(express.json());
server.use(cors());


server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.json('It works!!')
})


module.exports = server;
