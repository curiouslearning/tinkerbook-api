const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const cookieParser = require('cookie-parser');

const routes = require('./routes');
routes(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'
        ? err
        : {};
    res.status(err.status || 500);
    res.json({message: res.locals.message, error: res.locals.error});
});

module.exports = app;