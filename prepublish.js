const { copyFileSync, mkdirSync, existsSync, rmSync, readdirSync, readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const { version } = require('./package.json');

const PACKAGE_FOR_BUILD = join('package', 'package.json');

if (existsSync('dist')) {
    rmSync('dist', {recursive: true});
}
mkdirSync('dist');

function copyFromBuild(filePath) {
    const files = readdirSync(filePath)
    for (const file of files) {
        copyFileSync(
            join(filePath, file),
            join('dist', file.replace(/\.([a-z0-9]+\.)/.exec(file)[1], '')),
        )
    }
}

const pkgPackage = JSON.parse(readFileSync(PACKAGE_FOR_BUILD, 'utf8'));
pkgPackage.version = version;
writeFileSync(PACKAGE_FOR_BUILD, JSON.stringify(pkgPackage, null, 2));

copyFileSync(join('package', 'package.json'), join('dist', 'package.json'));
copyFileSync(join('package', 'README.md'), join('dist', 'README.md'));

copyFromBuild('build/static/css');
copyFromBuild('build/static/js');
