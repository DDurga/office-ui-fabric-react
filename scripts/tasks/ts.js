module.exports = function (options) {
  const path = require('path');
  const execSync = require('../exec-sync');
  const resolve = require('resolve');
  const typescriptPath = 'node ' + resolve.sync('typescript/lib/tsc');
  const libPath = path.resolve(process.cwd(), 'lib');
  const srcPath = path.resolve(process.cwd(), 'src');
  const extraParams = '--pretty' + (options.isProduction ? ` --inlineSources --sourceRoot ${path.relative(libPath, srcPath)}` : '');

  execSync(typescriptPath + ' -outDir lib-commonjs -t es5 -m commonjs ' + extraParams);
  execSync(typescriptPath + ' -outDir lib -t es5 -m es2015 ' + extraParams);

  if (options.isProduction) {
    execSync(typescriptPath + ' -outDir lib-amd -t es5 -m amd ' + extraParams);
  }
};