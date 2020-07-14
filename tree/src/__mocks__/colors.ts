interface ColorInterface {
  [key: string]: any;
}

const handler = {
  get(target, anyColorName) {
    return (str) => str;
  },
};

const proxyFactory = (): ColorInterface => {
  return new Proxy({}, handler);
};

const colors = proxyFactory();

export default colors;
