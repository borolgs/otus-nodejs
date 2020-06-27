const axios = require('axios');
const asyncHandler = require('../middlware/async');

exports.getFacts = asyncHandler(async (req, res, next) => {
  const facts = await fetchFacts();
  res.status(200).json(facts);
  req.cache.set(req.path, facts);
});

async function fetchFacts() {
  const res = await axios.get('https://cat-fact.herokuapp.com/facts');
  const facts = res.data.all.map(({ user, text }) => {
    let author = user ? `${user.name.first} ${user.name.last}` : 'Noname';
    return { author, text };
  });
  return facts;
}
