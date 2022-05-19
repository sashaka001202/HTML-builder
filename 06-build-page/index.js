
const path = require('path');
const pathDir = path.join(__dirname);
const { readdir, mkdir,copyFile } = require('fs/promises');
const fs = require('fs');




(async function (pafthFile) {
  try {

    const pathFilesFonts = path.join(pafthFile, 'assets','fonts');
    const pathFilesImg = path.join(pafthFile, 'assets','img');
    const pathFilesSvg = path.join(pafthFile, 'assets','svg');
    const outNameFolder = path.join(pafthFile, 'project-dist');
    const outNameAssets = path.join(pafthFile, 'project-dist', 'assets');
    const filesFonts = await readdir(pathFilesFonts, { withFileTypes: true });
    const filesImg = await readdir(pathFilesImg, { withFileTypes: true });
    const filesSvg = await readdir(pathFilesSvg, { withFileTypes: true });

    await mkdir(outNameAssets, { recursive: true });
    await mkdir(path.join(outNameAssets, 'fonts'), { recursive: true });
    await mkdir(path.join(outNameAssets, 'img'), { recursive: true });
    await mkdir(path.join(outNameAssets, 'svg'), { recursive: true });

    for (const file of filesFonts) {
  
      const srcName = path.join(pafthFile, 'assets','fonts', file.name);
      const destName = path.join(pafthFile, 'project-dist','assets','fonts', file.name);
      await copyFile(srcName, destName);
    }
    for (const file of filesImg) {
  
      const srcName = path.join(pafthFile, 'assets','img', file.name);
      const destName = path.join(pafthFile, 'project-dist','assets','img', file.name);
      await copyFile(srcName, destName);
    }

    for (const file of filesSvg) {
  
      const srcName = path.join(pafthFile, 'assets','svg', file.name);
      const destName = path.join(pafthFile, 'project-dist','assets','svg', file.name);
      await copyFile(srcName, destName);
    }






    const pathCssFiles = path.join(pafthFile, 'styles');

    
    await mkdir(outNameFolder, { recursive: true });
    const outNameStyle = path.join(pafthFile, 'project-dist', 'style.css');

    const files = await readdir(pathCssFiles, { withFileTypes: true });
    const output = fs.createWriteStream(outNameStyle);

    for (const file of files) {
      if (file.isFile() && (path.extname(file.name) === '.css')) {
        const srcName = path.join(pathCssFiles, file.name);
        const input = fs.createReadStream(srcName, 'utf-8');
        input.on('data', chunk => output.write(chunk));
      }

    }


    const pathHtmlTemlate = path.join(pafthFile, 'template.html');
    const pathHtmlResult = path.join(pafthFile, 'project-dist', 'index.html');
    const outputHtml = fs.createWriteStream(pathHtmlResult);
    const pathHtmlFiles = path.join(pafthFile, 'components');

    const filesHtml = await readdir(pathHtmlFiles, { withFileTypes: true });

    let data = '';


    const inputHtmlTemlate = fs.createReadStream(pathHtmlTemlate, 'utf-8');
    inputHtmlTemlate.on('data', chunk => data += chunk);
    inputHtmlTemlate.on('end', () => {
      const rp = /{{(.*?)}}/g;
      const points = data.match(rp);

      for (let index = 0; index < points.length; index++) {
        for (const file of filesHtml) {
          if(file.isFile() && (path.extname(file.name) === '.html') && `{{${file.name.split('.')[0]}}}` === points[index]){
            let full = '';
            const pathHtmlFileTemlate = path.join(pathHtmlFiles, file.name);
            const inputProm = fs.createReadStream(pathHtmlFileTemlate, 'utf-8');
            inputProm.on('data', chunk => full += chunk);

            inputProm.on('end', () => {
              data = data.replace(points[index], full);
              
              const outputProm = fs.createWriteStream(pathHtmlResult);
              outputProm.write(data);
              full = '';


            })
            

          }
        }

      }

    });
   
    console.log('Готово!');
  } catch (error) {
    console.error('there was an error:', error.message);
  }
})(pathDir);



