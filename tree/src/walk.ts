import fs from 'fs';
import path from 'path';

type WalkProps = {
  isLast: boolean;
  isFile: boolean;
  parentData: any;
  depth: number;
  reachLimit: boolean;
  hasChildren: boolean;
};

type WalkCallback = (filepath: string, props: WalkProps) => any;

export const checkDirectory = (dirpath: string) => {
  if (!fs.existsSync(dirpath)) {
    throw new Error(`Directory "${dirpath}" does not exists!`);
  }
};

export const isFile = (filepath: string) => {
  if (!fs.existsSync(filepath)) {
    return true;
  }
  return fs.statSync(filepath).isFile();
};

export const walk = (dirpath: string, depthLimit: number | null = null, cb: WalkCallback) => {
  checkDirectory(dirpath);

  (function _walk(
    filepath,
    depth = 0,
    props = { isLast: false, isFile: false, parentData: null, depth: 0, reachLimit: false, hasChildren: false },
  ) {
    props.depth = depth;

    if (isFile(filepath)) {
      props.hasChildren = false;

      cb(filepath, { ...props, isFile: true });
      return;
    }

    const childrenNames = fs.readdirSync(filepath);
    if (childrenNames.length > 0) {
      props.hasChildren = true;
    }

    const reachLimit = depthLimit != null && depth >= depthLimit;
    if (reachLimit) {
      cb(filepath, { ...props, reachLimit });
      return;
    }

    const dataFromParent = cb(filepath, props);
    props.parentData = dataFromParent || null;

    childrenNames.forEach((name, i) => {
      const isLast = i === childrenNames.length - 1;
      const childPath = path.join(filepath, name);
      _walk(childPath, depth + 1, { ...props, isLast });
    });
  })(dirpath);
};
