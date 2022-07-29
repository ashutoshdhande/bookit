require('dotenv').config();

const dbConnect = require('./config/db');
const app = require('./app');

dbConnect();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}....`);
});
