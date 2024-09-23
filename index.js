const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const infoRouter = require('./src/router/infoRouter');
const middleware = require('./src/middleware/auth');

// Add body-parser middleware first
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define routes after body-parser
app.use('/api', infoRouter);
app.use(middleware);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
