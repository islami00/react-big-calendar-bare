#!/usr/bin/env zx
import isCI from 'is-ci'

const {
  b = isCI, // pass `-b` to build if you want it to run browserslist update outside of CI environment
} = argv

if (b) {
  // Update browserslist
  await $`npx update-browserslist-db@latest`
}

console.log(chalk.blue('[BEGIN BUILD]'))
console.log(chalk.blue('Building js'))
// build distributables
await $`NODE_ENV=production rollup -c`
console.log(chalk.blue(`Compiling 'lib' js files`))
// build files used for overrides
await $`NODE_ENV=production RBC_CJS_BUILD=true babel src --out-dir lib`
console.log(chalk.blue(`Copying SASS files to 'lib'`))
// and since we don't currently use CSS modules...
await fs.copy('./src/sass', './lib/sass')
console.log(chalk.blue(`...and the 'Add-on' SASS`))
// don't forget DnD
await fs.copy(
  './src/addons/dragAndDrop/styles.scss',
  './lib/addons/dragAndDrop/styles.scss'
)
console.log(chalk.blue('Now we will build some CSS'))
// Compile SASS from './lib' to get sourcemaps
console.log(chalk.blue('Compile base styles'))
await $`sass ./lib/sass/styles.scss ./lib/css/react-big-calendar.css`
console.log(chalk.blue('Compile Add-on styles'))
// don't forget DnD
await $`sass ./lib/addons/dragAndDrop/styles.scss ./lib/addons/dragAndDrop/styles.css`
console.log(chalk.blue('Post process all CSS'))
// We do not use postcss to process SASS, as it's
// SASS processor still uses node-sass by default
await $`postcss -r ./lib/**/*.css`

// Copy ts files
console.log(chalk.blue('...Finally the types'))
await copyTypesInDir('./')
await copyTypesInDir('./utils')

console.log(chalk.blue('[BUILD COMPLETE]'))

async function copyTypesInDir(dirname) {
  const typeFiles = await fs
    .readdir(path.resolve('./src', dirname))
    .then((files) => files.filter((fn) => fn.endsWith('.ts')))

  for (const file of typeFiles)
    await fs.copy(
      path.resolve('./src', dirname, file),
      path.resolve('./lib', dirname, file)
    )
}
