const redis = require("redis"),
  app = require('express')(),
  client = redis.createClient(),
  bodyParser = require('body-parser'),
  { promisify } = require('util'),
  cors = require('cors'),
  getAsync = promisify(client.get).bind(client);

const PORT = process.env.PORT || 4000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());


client.on('connect', function (data) {
  console.log('Redis client connected');
});
client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

const insert = async () => {
  await client.INCRBY('pageCount', 1);
  const result = await getAsync('pageCount');
  console.log('GET result -> ' + result);
  return result;
}

app.get('/insert', async (req, res) => {
  try {
    const data = await insert();
    console.log('data is: ', data);
    res.json({ count: data });
  } catch (error) {
    res.status(400).json({ fail: error });
  }
});

app.listen(PORT, () => {
  console.log(`app listen on localhost:${PORT}`);
});