const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const firewallController = require('./FirewallController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(firewallController);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
