const fs = require('fs');
const draw = require('./drawTree');

const exampleData = {
  name: 1,
  items: [
    { name: 2, items: [{ name: 3 }, { name: 4 }] },
    { name: 5, items: [{ name: 6 }] },
  ],
};

const checkFilePath = (filepath) => {
  if (!fs.existsSync(filepath) || !filepath.endsWith('.json')) {
    throw new Error('Specify json file path!');
  }
}

const run = async () => {
  try {
    const arg = process.argv[2];

    if (arg === 'example') {
      console.log(`${JSON.stringify(exampleData)}\n\n->\n\n${draw(exampleData)}`);

    } else {
      checkFilePath(arg);
      const json = await fs.promises.readFile(arg, { encoding: 'utf-8' });
      console.log(draw(JSON.parse(json)));
    }
  } catch (error) {
    console.log(error.message);
  }
}

run();
