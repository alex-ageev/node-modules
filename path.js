//https://nodejs.org/api/path.html
import path from 'path';
const dirname = path.dirname(import.meta.url);

/*
A biblioteca path fornece uma série de métodos para trabalhar
com caminhos de ficheiros e diretório no sistema de ficheiros do computador.
Alguns dos métodos mais comuns são:
/
path.join(): concatena diferentes partes de um caminho
e retorna o caminho resultante.
*/

console.log(path.join(dirname, '..', 'pasta1'));
// "caminho/atual/../pasta1"

/*
path.resolve(): resolve um caminho a partir de um
diretório base e retorna o caminho absoluto
resultante.
*/
console.log(path.resolve(dirname, 'pasta1', 'pasta2', 'ficheiro.js'));
// "caminho/absoluto/para/pasta1/pasta2/ficheiro.js"

/*
path.sep: retorna o separador de caminhos utilizado pelo OS.
*/

console.log(path.sep);
// '/' no Unix, '\' no Windows

/*
path.isAbsolute(): verifica se um caminho é absoluto ou relativo.
*/
console.log(path.isAbsolute('pasta1/pasta2')); // false
console.log(path.isAbsolute('/pasta1/pasta2')); // true

/*
path.basename(): retorna o nome do ficheiro de um caminho completo. Por exemplo:
*/
console.log(path.basename('/pasta1/pasta2/ficheiro.js'));
// "ficheiro.js"
/*
path.extname(): retorna a extensão de um ficheiro de um caminho completo. Por exemplo:
*/
console.log(path.extname('/pasta1/pasta2/ficheiro.js')); // ".js"

/*
path.parse(): retorna um objeto que representa um caminho,
contendo as propriedades root, dir, base, ext e name.

path.format(): retorna uma string do
caminho a partir de um objeto gerado pelo método path.parse().

path.normalize(): normaliza um caminho,
eliminando os "." e ".." do caminho e
transformando o separador de caminhos em um separador padrão.

path.relative(): retorna o caminho relativo de um path para outro.

path.dirname(): retorna o nome do diretório de um caminho completo.

path.delimiter: retorna o delimitador de caminhos utilizado pelo SO.

Além disso, o JavaScript também possui a classe URL,
que permite trabalhar com URLs de maneira mais fácil.
Podemos criar uma instância da classe URL
passando uma string que representa a URL como argumento:
*/

const siteURL = 'http://localhost:8080/users?id=5123';
const url = new URL(siteURL);
console.log(url);

/*
Façam uma função que, dado um diretório
base e o nome de um ficheiro, retorne o caminho absoluto
para esse ficheiro dentro do diretório base.
A função deve ser chamada "getAbsolutePath" e
deve receber dois parâmetros: "baseDir" e "fileName".
*/

function getAbsolutePath(baseDir, fileName) {
    return path.resolve(baseDir, fileName);
}

console.log(getAbsolutePath('/home/user/documents', 'report.txt'))
// Outputs: '/home/user/documents/report.txt'

/*
Façam uma função chamada "getFileNameWithoutExtension"
que, dado o caminho completo para um ficheiro,
retorne o nome do ficheiro sem a extensão.
A função deve receber um parâmetro "filePath".
*/

function getFileNameWithoutExtension(filePath) {
    let fileName = path.basename(filePath);
    let ext = path.extname(fileName);
    return fileName.replace(ext, '');
}
console.log(getFileNameWithoutExtension('/home/user/documents/report.txt'))
// Outputs: 'report'

/*
Façam uma função chamada "getRelativePath" que
dado dois caminhos absolutos para dois ficheiros,
retorne o caminho relativo do primeiro ficheiro para o segundo.
A função deve receber dois parâmetros: "fromPath" e "toPath".
*/

function getRelativePath(fromPath, toPath) {
    return path.relative(fromPath, toPath);
}
console.log(getRelativePath('/home/user/documents/', '/home/user/images/'))
// Outputs: '../images'