const shell = require('shelljs')

shell.exec([
  'watchman watch-del-all',
  'rm -rf node_modules',
  'rm -rf $TMPDIR/react-*',
  'rm -rf $TMPDIR/npm-*',
  'npm cache clean',
  'npm install',
  './android/gradlew clean -p ./android/',
  'rm -rf iOS/build',
  'npm start -- --reset-cache'
].join(';'))

// const program = require('commander')
// program
  // .command('sos')
  // .version('0.0.1')
  // .description('Remove caches for a react native project')
  // .action(() => {
    // shell.exec([
    //   'watchman watch-del-all',
    //   'rm -rf node_modules',
    //   'rm -rf $TMPDIR/react-*',
    //   'rm -rf $TMPDIR/npm-*',
    //   'npm install',
    //   './android/gradlew clean -p ./android/',
    //   'rm -rf iOS/build',
    //   'npm start -- --reset-cache'
    // ].join(';'))
  // })
