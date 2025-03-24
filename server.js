//Install express server
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const whitelist = ['http://localhost:8080', 'http://qualidnd-service.herokuapp.com', 'https://qualidnd-service.herokuapp.com', 'http://localhost:4200', 'http://qualidnd.herokuapp.com', 'https://qualidnd.herokuapp.com']; // list of allow domain

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        if (whitelist.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}

app.use(cors(corsOptions));

// Serve only the static files form the dist directory
app.use(express.static('dist/'));

app.get('/*', function (req, res) {

    res.sendFile('index.html', { root: 'dist/' });
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4200);