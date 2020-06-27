const cache = new Map();

function set(key, value, seconds = 60) {
  return cache.set(key, [value, Date.now(), seconds]);
}

function get(key) {
  const value = has(key) && !isExpired(key) && cache.get(key)[0];
  return value;
}

function has(key) {
  return cache.has(key);
}

function isExpired(key) {
  const [_, timestamp, seconds] = cache.get(key);
  const expired = (Date.now() - timestamp) / 1000 > seconds;
  return expired;
}

module.exports = {
  get,
  set,
};
