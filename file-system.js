
// Para iteragir com sistema de ficheiros existe um módulo fs:
// https://nodejs.org/api/fs.html

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Para criar uma pasta
fs.mkdirSync(path.resolve(dirname, 'pasta'));

// Caso queremos criar pastas dentro de pastas
fs.mkdirSync(path.resolve(dirname, 'pasta', 'pasta2', 'pasta3'), {recursive: true});

// Para criar uma pasta de forma assíncrona
fs.mkdir(path.resolve(dirname, 'pasta'), (err) => {
    if (err) { console.log(err); return; }
    console.log('Pasta criada')
});

// Para apagar uma pasta vázia
fs.rmdir(path.resolve(dirname, 'pasta'), (err) => {
    if (err) { console.log(err); return; }
    console.log('Pasta removida')
})

// Para criar um ficheiro e escrever conteudo
fs.writeFile(path.resolve(dirname, 'test.txt'), 'qweqwe qweqew qwe', (err) => {
    if (err) { console.log(err); return; }
    console.log('Ficheiro guardado')

    // Para adicionar conteudo ao ficheiro (garantidamente) começa hell de callbacks!!
    fs.appendFile(path.resolve(dirname, 'test.txt'), 'texto no final', (err) => {
        if (err) { console.log(err); return; }
        console.log('Ficheiro guardado')
    })
})

// uma função universal
const writeFileAsync = async (path, data) => {
    return new Promise((resolve, reject) => fs.writeFile(path, data, (err) => {
        if(err) {
            return reject(err.message)
        }
        resolve()
    }))
}

const appendFileAsync = async (path, data) => {
    return new Promise((resolve, reject) => fs.appendFile(path, data, (err) => {
        if(err) {
            return reject(err.message)
        }
        resolve()
    }))
}

const readFileAsync = async (path) => {
    return new Promise((resolve, reject) => fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
        if(err) {
            return reject(err.message)
        }
        resolve(data)
    }))
}
// escrever de forma assincrona
writeFileAsync(path.resolve(dirname, 'test.txt'), 'data')
    .then(() => appendFileAsync(path.resolve(dirname, 'test.txt'), '123'))
    .then(() => appendFileAsync(path.resolve(dirname, 'test.txt'), '456'))
    .then(() => appendFileAsync(path.resolve(dirname, 'test.txt'), '578'))
    .then(() => readFileAsync(path.resolve(dirname, 'test.txt')))
    .then(data => console.log(data))
    .catch(err => console.log(err));

// Para remover ficheiro
const removeFileAsync = async (path) => {
    return new Promise((resolve, reject) => fs.rm(path, (err) => {
        if(err) {
            return reject(err.message)
        }
        resolve()
    }));
}

// removeFileAsync(path.resolve(dirname, 'test.txt'))
//     .then(() => console.log('ficheiro removido'));


// Exercicio, buscar váriavel de ambiente 'TEXT', e escrever-la no ficheiro text.txt
// ler o ficheiro, contar a quantidade de palavras e escrever o resultado
// em novo ficheiro count.txt, e remover primeiro o ficheiro

const text = process.env.TEXT || '';


writeFileAsync(path.resolve(dirname, 'text.txt'), text)
    .then(() => readFileAsync(path.resolve(dirname, 'text.txt')))
    .then(data => data.split(' ').length)
    .then(count => writeFileAsync(path.resolve(dirname, 'count.txt'), `Qtd palavras: ${count}`))
    .then(() => removeFileAsync(path.resolve(dirname, 'text.txt')))
