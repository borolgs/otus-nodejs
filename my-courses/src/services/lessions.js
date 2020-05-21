const Lession = require('../models/lessions');
const { NotFoundError } = require('../common/errors');

exports.get = async course => {
  const lessions = await Lession.find({ course });
  return lessions;
};

exports.getOne = async id => {
  const lession = await Lession.findById(id);
  if (!lession) {
    throw new NotFoundError(`Lession not found with id of ${id}`);
  }
  return lession;
};

exports.create = async data => {
  const lession = await Lession.create(data);
  return lession;
};

exports.update = async (id, data) => {
  const lession = await Lession.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!lession) {
    throw new NotFoundError(`Lession not found with id of ${id}`);
  }
  return lession;
};

exports.delete = async id => {
  const lession = await Lession.findById(id);
  if (!lession) {
    throw new NotFoundError(`Lession not found with id of ${id}`);
  }
  lession.remove();
};
