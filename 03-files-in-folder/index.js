
const path = require('path');
const pafthFile = path.join(__dirname, 'secret-folder');

const { readdir, stat } = require('fs/promises');

(async function (pafthFile) {
  try {
    const files = await readdir(pafthFile, { withFileTypes: true });

    for (const file of files) {

      if (file.isFile()) {
        const pathFileNew = path.join(pafthFile, file.name);
        const size = await stat(pathFileNew);

        printInfo(file,size.size);


      }
    }

  } catch (error) {
    console.error('there was an error:', error.message);
  }
})(pafthFile);

function printInfo(file,size) {
  const result=path.basename(file.name,path.extname(file.name))+' - '+path.extname(file.name)+' - '+size+'b';
  console.log(result);

}