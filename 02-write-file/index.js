const fs = require('fs');
const { stdin, stdout} = process;
const path = require('path');
const pafthFile = path.join(__dirname, 'text.txt');

console.log('Привет. Как ты ? Жду текст');

// const input = fs.createReadStream('source.txt', 'utf-8');
const output = fs.createWriteStream(pafthFile);

// input.pipe(output);

stdin.on('data', data => {

  output.write(data);

  const dataString=data.toString().split('');
  const newData= dataString.splice(0, dataString.length-2).join('');

  if (newData=='exit'){
    process.exit();
  }
  
});

process.on('exit', () => stdout.write('Удачи!'));
process.on('SIGINT', () => {process.exit();});