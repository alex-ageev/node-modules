//https://nodejs.org/api/events.html

import Emitter from 'events';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const emitter = new Emitter();

const callback = (data, second) => {
    console.log('Mensagem:' + data);
    console.log('2 argumento:' + second);
}

//podemos criar um evento proprio
emitter.on('message', callback)

const MSG = process.env.MESSAGE || '';

//disparar o evento
if (MSG) {
    emitter.emit('message', MSG, 123)
} else {
    emitter.emit('message', 'No message')
}

/*
    Esta funicionalidade é bastante útil e é utilizada muito em Nodejs
    criação de HTTP servidores, troca de mensagens,
    websockets
    long pulling
    clusters
*/

// para gerar o evento única vez utilizamos: emitter.once

emitter.removeAllListeners()

//devemos indicar qual é o callback que queremos apagar.
emitter.removeListener('message', callback)

// Exercicio

/*
Façam uma função que rastreie
as mudanças de um ficheiro e,
quando houver uma alteração,
emita um evento chamado 'fileChanged'
e passa o nome do ficheiro e a data da
última modificação como argumentos.
*/

emitter.on('fileChanged', (filePath, lastModified) => {
    console.log(`Ficheiro ${filePath} foi modificado em ${lastModified}`);
});

function trackFileChanges(filePath) {
    fs.watchFile(filePath, {interval: 2000, persistent: true }, (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
            emitter.emit('fileChanged', filePath, curr.mtime);
        }
        // atime, size, birthtime..
    });
}
trackFileChanges('./aulas/example.txt');

/*
Faça uma função chamada randomJoke
que emita um evento chamado 'joke'
com um piada ramdom cada vez
que é chamada.
Adicione um método "on" que "ouve"
o evento 'joke' e imprima a piada
na consola quando ela for emitida.
*/

const jokes = [
    "O que acontece quando chove na Inglaterra? Vira Inglalama.",
    "Que nome se dá a uma ferramenta perdida? Foice.",
    "Qual o contrário de paixão? Mãeteto.",
];

emitter.on('joke', (joke) => {
    console.log(`Piada: ${joke}`);
});

function randomJoke() {
    const jokeIndex = Math.floor(Math.random() * jokes.length);
    emitter.emit('joke', jokes[jokeIndex]);
}

randomJoke();