const fs = require('fs');

function lerArquivoJson(caminhoArquivo) {
    try {
        const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');
        return JSON.parse(conteudo);
    } catch (error) {
        console.error(`Erro ao ler o arquivo JSON (${caminhoArquivo}): ${error.message}`);
        return null;
    }
}

function corrigirNomes(database) {
    const nomeCorrigido = (nome) => {
        if (nome) {
            return nome.replace(/æ/g, 'a').replace(/ø/g, 'o');
        }
        return nome;
    };

    try {
        database.forEach((item) => {
            if (item.nome) {
                item.nome = nomeCorrigido(item.nome);
            }

            if (item.marca) {
                item.marca = nomeCorrigido(item.marca);
            }
        });
    } catch (error) {
        console.error(`Erro ao corrigir nomes: ${error.message}`);
    }
}

function corrigirVendas(database) {
    try {
        database.forEach((item) => {
            if (typeof item.vendas === 'string') {
                item.vendas = parseInt(item.vendas, 10);
            }
        });
    } catch (error) {
        console.error(`Erro ao corrigir vendas: ${error.message}`);
    }
}

function exportarArquivoJson(caminhoArquivo, data) {
    try {
        const conteudoJson = JSON.stringify(data, null, 2);
        fs.writeFileSync(caminhoArquivo, conteudoJson, 'utf-8');
        console.log(`Arquivo exportado com sucesso: ${caminhoArquivo}`);
    } catch (error) {
        console.error(`Erro ao exportar o arquivo JSON (${caminhoArquivo}): ${error.message}`);
    }
}

const caminhoDatabase1 = 'data/broken_database_1.json';
const caminhoDatabase2 = 'data/broken_database_2.json';

const database1 = lerArquivoJson(caminhoDatabase1);
const database2 = lerArquivoJson(caminhoDatabase2);

if (database1 && database2) {
    corrigirNomes(database1);
    corrigirNomes(database2);

    corrigirVendas(database1);
    corrigirVendas(database2);

    exportarArquivoJson('data/broken_database_1_corrigido.json', database1);
    exportarArquivoJson('data/broken_database_2_corrigido.json', database2);

    console.log('Correções aplicadas e arquivos exportados com sucesso.');
} else {
    console.error('Falha ao carregar os arquivos de banco de dados.');
}
