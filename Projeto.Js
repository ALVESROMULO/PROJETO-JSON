let catalogo = [];

function carregarCatalogo() {
    try {
        const data = fs.readFileSync('catalogo.json', 'utf8');
        catalogo = JSON.parse(data);
    } catch (err) {
        console.error('Erro ao carregar o arquivo JSON:', err);
        catalogo = [];
    }
}

function salvarCatalogo() {
    try {
        const json = JSON.stringify(catalogo, null, 2);
        fs.writeFileSync('catalogo.json', json, 'utf8');
        console.log('Catálogo salvo com sucesso!');
    } catch (err) {
        console.error('Erro ao salvar o arquivo JSON:', err);
    }
}

function listarLivros() {
    console.log('--- Catálogo de Livros ---');
    catalogo.forEach(livro => {
        console.log(`${livro.titulo} - ${livro.autor} (${livro.ano}) - Avaliação: ${livro.avaliacao}`);
    });
    console.log('--------------------------');
}

function adicionarLivro(titulo, autor, genero, ano, avaliacao) {
    const novoLivro = {
        titulo: titulo,
        autor: autor,
        genero: genero,
        ano: ano,
        avaliacao: avaliacao
    };
    catalogo.push(novoLivro);
    salvarCatalogo(); 
}

function buscarLivro(termo) {
    const termoLower = termo.toLowerCase();
    const resultados = catalogo.filter(livro =>
        livro.titulo.toLowerCase().includes(termoLower) ||
        livro.autor.toLowerCase().includes(termoLower) ||
        livro.genero.toLowerCase().includes(termoLower)
    );
    return resultados;
}

function classificarLivros(criterio) {
    switch (criterio) {
        case 'titulo':
            catalogo.sort((a, b) => a.titulo.localeCompare(b.titulo));
            break;
        case 'autor':
            catalogo.sort((a, b) => a.autor.localeCompare(b.autor));
            break;
        case 'avaliacao':
            catalogo.sort((a, b) => b.avaliacao - a.avaliacao);
            break;
        default:
            console.log('Critério de classificação inválido.');
            return;
    }
    listarLivros();
}

function avaliarLivro(titulo, novaAvaliacao) {
    const livro = catalogo.find(livro => livro.titulo === titulo);
    if (livro) {
        livro.avaliacao = novaAvaliacao;
        salvarCatalogo(); 
        console.log(`Avaliação do livro "${titulo}" atualizada para ${novaAvaliacao}.`);
    } else {
        console.log(`Livro "${titulo}" não encontrado.`);
    }
}

const listaLivrosElement = document.getElementById('livros');


function exibirLivros() {
    
    listaLivrosElement.innerHTML = '';

        catalogo.forEach(livro => {
        const li = document.createElement('li');
        li.textContent = `${livro.titulo} - ${livro.autor} (${livro.ano}) - Avaliação: ${livro.avaliacao}`;
        listaLivrosElement.appendChild(li);
    });
}

formAdicionarLivro.addEventListener('submit', function(event) {
    event.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const genero = document.getElementById('genero').value;
    const ano = parseInt(document.getElementById('ano').value);
    const avaliacao = parseFloat(document.getElementById('avaliacao').value);

    adicionarLivro(titulo, autor, genero, ano, avaliacao);
    exibirLivros();
    this.reset(); 
});


formBuscarLivro.addEventListener('submit', function(event) {
    event.preventDefault();
    const termoBusca = document.getElementById('termoBusca').value;
    const resultados = buscarLivro(termoBusca);

    
    listaLivrosElement.innerHTML = '';

    
    resultados.forEach(livro => {
        const li = document.createElement('li');
        li.textContent = `${livro.titulo} - ${livro.autor} (${livro.ano}) - Avaliação: ${livro.avaliacao}`;
        listaLivrosElement.appendChild(li);
    });
});

exibirLivros();
