const fs = require('fs');
const path = require('path');

const checkDirectory = (dirpath) => {
  if (!fs.existsSync(dirpath)) {
    throw new Error(`Directory "${dirpath}" does not exists!`);
  }
};

const isFile = (filepath) => {
  if (!fs.existsSync(filepath)) {
    return true;
  }
  return fs.statSync(filepath).isFile();
};

const walk = (dirpath, depthLimit = null, cb = (filepath, props) => {}) => {
  checkDirectory(dirpath);

  (function _walk(
    filepath,
    depth = 0,
    props = { isLast: false, isFile: false, parentData: null, depth: 0, reachLimit: false, hasChildren: false },
  ) {
    props['depth'] = depth;

    if (isFile(filepath)) {
      props['hasChildren'] = false;

      cb(filepath, { ...props, isFile: true });
      return;
    }

    const childrenNames = fs.readdirSync(filepath);
    if (childrenNames.length > 0) {
      props['hasChildren'] = true;
    }

    const reachLimit = depthLimit != null && depth >= depthLimit;
    if (reachLimit) {
      cb(filepath, { ...props, reachLimit });
      return;
    }

    const dataFromParent = cb(filepath, props);
    props['parentData'] = dataFromParent || null;

    childrenNames.forEach((name, i) => {
      const isLast = i === childrenNames.length - 1;
      const childPath = path.join(filepath, name);
      _walk(childPath, depth + 1, { ...props, isLast });
    });
  })(dirpath);
};

module.exports = { walk, isFile, checkDirectory };
