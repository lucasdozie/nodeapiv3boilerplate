const redis = require('redis');
const { promisify } = require("util");
const client = redis.createClient();

const getAsync = () => promisify(client.get).bind(client);
 
getAsync.then(console.log).catch(console.error);



// eslint-disable-next-line no-console
client.on('connect', () => console.log('Redis client connected'));

// eslint-disable-next-line no-console
client.on('error', err => console.error(err));

const set = (key, value) => client.set(key, value, redis.print);

const get = key =>
  client.get(key, (err, result) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return null;
    }

    return result;
  });

module.exports = {
  set,
  get,
  getAsync
};