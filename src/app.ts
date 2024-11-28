const express = require('express');
const bodyParser = require('body-parser');
import routes from './routes'


const app = express();

app.use(bodyParser.json());
app.use(routes)

export default app