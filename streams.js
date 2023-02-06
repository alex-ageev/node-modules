// Readable
// Writable
// Duplex - Readable + Writable
// Transform - Igual ao Duplex, mas consegue mudar dados ao longo da leitura
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

fs.readFile(path.resolve(dirname, 'test_streams.txt'), {encoding: 'utf-8'}, (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data)
})

// const stream = fs.createReadStream(path.resolve(dirname, 'test2.txt'))
//
// // Um chunk por defeito são 64kb
// stream.on('data', (chunk) => {
//     console.log(chunk)
// })
// stream.on('end', () => console.log('Leitura acabou'))
// stream.on('open', () => console.log('Leitura começou'))
// stream.on('error', (e) => console.log(e))

const writableStream = fs.createWriteStream(path.resolve(dirname, 'test2.txt'))
for (let i = 0; i <= 10; i++) {
    writableStream.write(i + '\n');
}
writableStream.end()
// writableStream.close()
// writableStream.destroy()
// writableStream.on('error')

// const http = require('http');
//
// http.createServer((req, res) => {
//     //request - readable stream
//     //resonse - writable stream
//     const stream = fs.createReadStream(path.resolve(dirname, 'test.txt'))
//
//     // Stream acaba de ler antes de utilizador fazer download
//     stream.pipe(res)
// })


// Façam uma função que leia um ficheiro de texto,
// converte todas as letras para maiúsculas,
// e escreva o resultado em outro ficheiro chamado output.txt

function convertToUpperCase(fileName) {
    const readStream = fs.createReadStream(path.resolve(dirname, fileName));
    const writeStream = fs.createWriteStream(path.resolve(dirname, 'output.txt'));

    readStream.on('data', chunk => {
        writeStream.write(chunk.toString().toUpperCase());
    });

    readStream.on('end', () => {
        console.log('Conversão concluída!');
    });
}

convertToUpperCase('input.txt');
