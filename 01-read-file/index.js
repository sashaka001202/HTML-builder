const fs = require('fs');
const path = require('path');
const pafthFile = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(pafthFile);
readableStream.on('data', chunk => console.log(chunk.toString()));