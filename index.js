const fs = require('fs');

function lerArquivoJson(caminhoArquivo) {
    const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');
    return JSON.parse(conteudo);
}

function corrigirNomes(database) {
    const nomeCorrigido = (nome) => {
        if (nome) {
            return nome.replace(/æ/g, 'a').replace(/ø/g, 'o');
        }
        return nome;
    };

    database.forEach((item) => {
        if (item.nome) {
            item.nome = nomeCorrigido(item.nome);
        }

        if (item.marca) {
            item.marca = nomeCorrigido(item.marca);
        }   
    });
}

function corrigirVendas(database) {
    database.forEach((item) => {
        if (typeof item.vendas === 'string') {
            item.vendas = parseInt(item.vendas, 10);
        }
    });
}

function exportarArquivoJson(caminhoArquivo, data) {
    const conteudoJson = JSON.stringify(data, null, 2);
    fs.writeFileSync(caminhoArquivo, conteudoJson, 'utf-8');
}

const caminhoDatabase1 = 'data/broken_database_1.json';
const caminhoDatabase2 = 'data/broken_database_2.json';

const database1 = lerArquivoJson(caminhoDatabase1);
const database2 = lerArquivoJson(caminhoDatabase2);

corrigirNomes(database1);
corrigirNomes(database2);

corrigirVendas(database1);
corrigirVendas(database2);

exportarArquivoJson('data/broken_database_1_corrigido.json', database1);
exportarArquivoJson('data/broken_database_2_corrigido.json', database2);

console.log('Correções aplicadas e arquivos exportados com sucesso.');
