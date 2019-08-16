/**
 * Generate files for examples-api to `public` folder
 *
 * API ENDPOINTS
 *
 *     Get a list of example names in zeit/now-examples
 *     /_api/list.json
 *
 *     Get detailed list of all examples
 *     /_api/manifest.json
 *
 *     Download example files by name (e.g. "gatsby")
 *     /_api/download/gatsby.tar.gz
 */

const debuglog = require('util').debuglog('API_BUILDER');
const { join } = require('path');
const fs = require('fs-extra');
const tar = require('tar-fs');

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

async function main() {
  const dist = join(__dirname, 'dist');
  await fs.emptyDir(dist);

  const examples = collectExampleNames(__dirname);
  debuglog(examples);

  // Generate `list.json`
  await fs.ensureDir(join(dist, '_api'));
  await fs.writeJSON(join(dist, '_api/list.json'), examples);

  // Generate 'download/*.tar.gz'
  await fs.ensureDir(join(dist, '_api/download'));
  await generateDownloads(__dirname, examples, join(dist, '_api/download'));

  // Copy `manifest.json`
  const target = join(__dirname, 'dist/_api/manifest.json');
  await fs.copy(join(__dirname, 'manifest.json'), target);

  // Copy dist/_api to public for zero-config
  await fs.copy(join(dist, '_api'), 'public');
}

async function generateDownloads(cwd, examples, downloadDir) {
  await fs.ensureDir(downloadDir);

  return Promise.all(
    examples.map(example => {
      return createTarball(
        join(cwd, example),
        join(downloadDir, `${example}.tar.gz`)
      );
    })
  );
}

async function createTarball(dir, dest) {
  debuglog(`Creating ${dest}`);

  return new Promise((resolve, reject) => {
    const stream = tar.pack(dir).pipe(fs.createWriteStream(dest));
    stream.on('close', resolve);
    stream.on('error', reject);
  });
}

function collectExampleNames(cwd) {
  const ignores = fs.readFileSync(join(cwd, '.gitignore'), 'utf8').split('\n');

  return fs
    .readdirSync(cwd)
    .filter(name => !isDotFile(name))
    .filter(name => isDirectory(join(cwd, name)))
    .filter(name => !ignores.includes(name));
}

const isDotFile = name => name.startsWith('.');
const isDirectory = path => fs.lstatSync(path).isDirectory();

process.on('unhandledRejection', error => {
  console.error(error);
  throw error;
});
