
const path = require('path');
const { readdir, mkdir, copyFile,rmdir } = require('fs/promises');


const pathDir = path.join(__dirname);
// 
// const output = fs.createWriteStream('destination.txt.gz');

(async function (pafthFile) {
  try {
    const pathFiles = path.join(pafthFile, 'files');
    const files = await readdir(pathFiles, { withFileTypes: true });
    await rmdir(pathFiles + '-copy', { recursive: true });
    await mkdir(pathFiles + '-copy', { recursive: true });

    for (const file of files) {
      const srcName = path.join(pafthFile, 'files', file.name);
      const destName = path.join(pafthFile, 'files-copy', file.name);
      await copyFile(srcName, destName);
      
    }

    console.log('Готово!');
  } catch (error) {
    console.error('there was an error:', error.message);
  }
})(pathDir);

