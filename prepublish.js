const { copyFileSync, mkdirSync, existsSync, rmSync, readdirSync } = require('fs');
const { join } = require('path');

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

copyFileSync(join('package', 'package.json'), join('dist', 'package.json'));
copyFileSync(join('package', 'README.md'), join('dist', 'README.md'));

copyFromBuild('build/static/css');
copyFromBuild('build/static/js');
