const handler = {
  get(target, anyColorName) {
    return (str) => str;
  },
};

colors = new Proxy({}, handler);

module.exports = colors;
