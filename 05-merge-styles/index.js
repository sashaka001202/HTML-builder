
const path = require('path');
const pathDir = path.join(__dirname);
const { readdir} = require('fs/promises');
const fs = require('fs');




(async function (pafthFile) {
  try {
    const pathCssFiles = path.join(pafthFile, 'styles');
    const files = await readdir(pathCssFiles, { withFileTypes: true });
    const outName = path.join(pafthFile,'project-dist', 'bundle.css');
    const output = fs.createWriteStream(outName);
    for (const file of files) {


      if (file.isFile()&&(path.extname(file.name)==='.css')) {

        const srcName = path.join(pathCssFiles, file.name);
        const input = fs.createReadStream(srcName, 'utf-8');
        input.on('data', chunk =>output.write(chunk));
      }

    }
    console.log('Готово!');
  } catch (error) {
    console.error('there was an error:', error.message);
  }
})(pathDir);

