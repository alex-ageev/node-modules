import os from 'os';
//https://nodejs.org/api/os.html
import cluster from 'cluster';

// sistema operativo
console.log(os.platform());

// arquitetura do processador
console.log(os.arch())

// núcleos do processador
console.log(os.cpus().length)

/*
é importante saber a qtd de cores
pq dependentemente de qtd, diferentes qtds
de processos da nossa api
*/

if (cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length - 2; i++) {
        // para iniciar um processo em cada core
        cluster.fork()
    }
    //event emitter
    cluster.on('exit', (worker) => {
        console.log(`Worker com pid ${worker.process.pid} morreu`)
        /* 
            iniciar logo um processo novo para que
            possamos trabalhar com o máximo de cores,

            podemos passar diferentes codes, signals..
            podemos tambem usar PM2
        */
        cluster.fork()
    });
} else {
    console.log(`Worker com pid ${process.pid} iniciado`)

    setInterval(() => {
        console.log(console.log(`Worker com pid ${process.pid} iniciado`))
    }, 50000)
}